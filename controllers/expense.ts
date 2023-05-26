import db from "../models";
import { Request, Response } from "express";
const { Expense }: any = db;

const createExpenseEntry = async (req: Request, res: Response) => {
  try {
    const expense = await Expense.create(req.body);

    if (expense) {
      return res.status(201).json({ expense });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllExpenseEntries = async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.findAll();

    if (expenses) {
      return res.status(200).json({ expenses });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

const getExpenseEntryById = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
    const expense = await Expense.findOne({
      where: { id: id },
    });

    if (expense) {
      return res.status(200).json({ expense });
    } else {
      res.status(404).send("Expense entry with specified ID does not exist");
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

const updateExpenseEntry = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
    const [updated] = await Expense.update(req.body, {
      where: { id: id },
    });

    if (updated) {
      const updatedExpense = await Expense.findOne({ where: { id: id } });
      return res.status(200).json({ expense: updatedExpense });
    } else {
      throw new Error("Expense entry not found");
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

const deleteExpenseEntry = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
    const deleted = await Expense.destroy({
      where: { id: id },
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
  createExpenseEntry,
  getAllExpenseEntries,
  getExpenseEntryById,
  updateExpenseEntry,
  deleteExpenseEntry,
};
