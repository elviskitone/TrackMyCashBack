import db from "../models";
import { Op } from "sequelize";
import { Request, Response } from "express";
const { User, Expense } = db;

const createUserExpenseEntry = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const expense = await Expense.create({
      name: req.body.name,
      value: req.body.value,
      user_email: user.email,
    });

    if (expense) {
      return res.status(201).json({ expense });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllUserExpenses = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    const expense = await Expense.findAll({
      where: {
        user_email: user.email,
      },
    });

    if (expense) {
      res.status(200).json({ expense });
    } else {
      res.status(404).send("Expense entry with specified name does not exist");
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

const getUserExpenseEntryByName = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    const expense = await Expense.findAll({
      where: {
        user_email: user.email,
        name: {
          [Op.like]: `%${req.body.name}%`,
        },
      },
    });

    if (expense) {
      res.status(200).json({ expense });
    } else {
      res.status(404).send("Expense entry with specified name does not exist");
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

const updateUserExpenseEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email } = req.params;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    const [updated] = await Expense.update(req.body, {
      where: {
        user_email: email,
        id: id,
      },
    });

    if (updated) {
      const updateExpense = await Expense.findOne({
        where: {
          id,
          user_email: email,
        },
      });
      return res.status(200).json({ expense: updateExpense });
    } else {
      throw new Error("Expense entry not found");
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

const deleteUserExpenseEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email } = req.params;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    const deleted = await Expense.destroy({
      where: {
        user_email: email,
        id: id,
      },
    });

    if (deleted) {
      return res.status(204).send("Expense entry deleted");
    } else {
      throw new Error("Expense entry not found");
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

export {
  createUserExpenseEntry,
  getAllUserExpenses,
  getUserExpenseEntryByName,
  updateUserExpenseEntry,
  deleteUserExpenseEntry,
};
