import db from "../models";
import { Op } from "sequelize";
import { Request, Response } from "express";
const { User, Income } = db;

const createUserIncomeEntry = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const income = await Income.create({
      name: req.body.name,
      value: req.body.value,
      user_email: user.email,
    });

    if (income) {
      return res.status(201).json({ income });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllUserIncomes = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    const income = await Income.findAll({
      where: {
        user_email: user.email,        
      },
    });

    if (income) {
      res.status(200).json({ income });
    } else {
      res.status(404).send("Income entry with specified name does not exist");
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

const getUserIncomeEntryByName = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    const income = await Income.findAll({
      where: {
        user_email: user.email,
        name: {
          [Op.like]: `%${req.body.name}%`,
        },
      },
    });

    if (income.length > 0) {
      res.status(200).json({ income });
    } else {
      res.status(404).send("Income entry with specified name does not exist");
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

const updateUserIncomeEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email } = req.params;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    const [updated] = await Income.update(req.body, {
      where: {
        user_email: email,
        id: id,
      },
    });

    if (updated) {
      const updateIncome: any = await Income.findOne({
        where: {
          id,
          user_email: email,
        },
      });
      return res.status(200).json({ income: updateIncome });
    } else {
      throw new Error("Income entry not found");
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

const deleteUserIncomeEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email } = req.params;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    const deleted = await Income.destroy({
      where: {
        user_email: email,
        id: id,
      },
    });

    if (deleted) {
      return res.status(204).send("Income entry deleted");
    } else {
      throw new Error("Income entry not found");
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export {
  createUserIncomeEntry,
  getAllUserIncomes,
  getUserIncomeEntryByName,
  updateUserIncomeEntry,
  deleteUserIncomeEntry,
};
