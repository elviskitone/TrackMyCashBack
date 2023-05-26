import db from "../models";
import { Request, Response } from "express";
const { Income } = db;

const createIncomeEntry = async (req: Request, res: Response) => {
  try {
    const income: any = await Income.create(req.body);

    if (income) {
      return res.status(201).json({ income });
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllIncomeEntries = async (req: Request, res: Response) => {
  try {
    const incomes: any = await Income.findAll();

    if (incomes) {
      return res.status(200).json({ incomes });
    }
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

const getIncomeEntryById = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
    const income = await Income.findOne({
      where: { id: id },
    });

    if (income) {
      return res.status(200).json({ income });
    } else {
      res.status(404).send("Income entry with specified ID does not exist");
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

const updateIncomeEntry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Income.update(req.body, {
      where: { id: id },
    });

    if (updated) {
      const updateIncome = await Income.findOne({ where: { id: id } });
      return res.status(200).json({ income: updateIncome });
    } else {
      throw new Error("Income entry not found");
    }
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
};

const deleteIncomeEntry = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
    const deleted: any = await Income.destroy({
      where: { id: id },
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
  createIncomeEntry,
  getAllIncomeEntries,
  getIncomeEntryById,
  updateIncomeEntry,
  deleteIncomeEntry,
};
