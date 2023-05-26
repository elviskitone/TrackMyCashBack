import { Request, Response } from "express";
import db from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { isTokenBlacklisted, blacklistToken } from "../blacklist";
const { User } = db;

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);

    if (user) {
      return res.status(201).json({ user });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed. User does not exist." });
    }

    if (user.password == null) {
      return res.status(401).json({
        message: "Include password",
      });
    }

    const passwordMatch = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    let token: string;
    

    do {
      token = jwt.sign({ id: user.id }, `${req.app.get("secretKey")}`, {
        expiresIn: "1d",
        algorithm: "HS256",
      });
    } while (isTokenBlacklisted(token));

    res.set("email", ` ${req.body.email}`);

    res.status(200).json({
      message: "Authentication successful",
      userdata: { user: user, token: token },
    });
  } catch (error: any) {
    res.redirect("/api/");
    res.status(500).json({ message: error.message });
  }
};

const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email }: any = req.params;
    const user = await User.findOne({
      where: { email: email },
    });

    if (user) {
      return res.status(200).json({ user });
    } else {
      res.status(404).send("User with specified Email does not exist");
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

const updateUsername = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email } = req.params;
    const existingUsername = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    const user = await User.findOne({
      where: { email },
    });

    if (existingUsername) {
      return res.status(409).json({ error: "Username already exists" });
    }

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    const [updated] = await User.update(
      {
        username: req.body.username,
      },
      {
        where: {
          email,
        },
      }
    );

    if (updated) {
      const updateUser = await User.findOne({
        where: {
          id,
          email,
        },
      });
      return res.status(200).json({ profile: updateUser });
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

const changePassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email } = req.params;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    let encryptedPassword: any;

    if (user) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      encryptedPassword = hashedPassword;
    }

    const [updated] = await User.update(
      {
        password: encryptedPassword,
      },
      {
        where: {
          email,
        },
      }
    );

    if (updated) {
      const updateUser = await User.findOne({
        where: {
          id,
          email,
        },
      });
      return res.status(200).json({ profile: updateUser });
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "User does not exist." });
    }    

    let strippedToken: any;
    const token: any = req.headers.authorization;

    if (token) {
      let decoded: any;
      let disableToken: any;

      strippedToken= token!.replace(/^Bearer\s+|\s$/g, "");
      decoded = jwt.verify(strippedToken, req.app.get("secretKey"));     

      if (decoded) {
        disableToken = blacklistToken(strippedToken);
      }
  
      if (disableToken) {
        res.status(200).json({ message: "Logout successful" });
      }
    } else {
      res.json({ message: "Token does not exist "});
      console.log("Token does not exist ");      
    }

  } catch (error) {
    console.error(error);
  }
  
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const {email} = req.params;

    const deleted = await User.destroy({
      where: { email: email },
    });

    if (deleted) {
      res.json({ message: "User has been deleted" });
    } else {
      throw new Error("User account not found");
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};



export {
  createUser,
  authenticate,
  getUserByEmail,
  updateUsername,
  changePassword,  
  logout,
  deleteUser,
};
