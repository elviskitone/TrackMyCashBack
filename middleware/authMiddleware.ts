import jwt from "jsonwebtoken";
import { blacklistToken } from "../blacklist";
import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {  
  let strippedToken: any;
  const token: any = req.headers.authorization;

  try {
    strippedToken = token!.replace(/^Bearer\s+|\s+$/g, "");
  } catch (error: any) {     
    console.log("There is an issue with the token.");
  }

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed. Missing Auth Token." });
  }

  try {
    let decoded: any;

    decoded = jwt.verify(strippedToken, req.app.get("secretKey"), {
      algorithms: ["HS256"],
    });
    const expirationDate: Date = new Date(decoded.exp * 1000);

    if (expirationDate <= new Date()) {
      blacklistToken(strippedToken);
      return res.status(401).json({ message: "Token expired" });
    }

    req.user = decoded;

    next();
  } catch (err: any) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  
};

export default authMiddleware;
