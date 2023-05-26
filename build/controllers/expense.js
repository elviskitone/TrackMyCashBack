"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpenseEntry = exports.updateExpenseEntry = exports.getExpenseEntryById = exports.getAllExpenseEntries = exports.createExpenseEntry = void 0;
const models_1 = __importDefault(require("../models"));
const { Expense } = models_1.default;
const createExpenseEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expense = yield Expense.create(req.body);
        if (expense) {
            return res.status(201).json({ expense });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createExpenseEntry = createExpenseEntry;
const getAllExpenseEntries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield Expense.findAll();
        if (expenses) {
            return res.status(200).json({ expenses });
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getAllExpenseEntries = getAllExpenseEntries;
const getExpenseEntryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const expense = yield Expense.findOne({
            where: { id: id },
        });
        if (expense) {
            return res.status(200).json({ expense });
        }
        else {
            res.status(404).send("Expense entry with specified ID does not exist");
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.getExpenseEntryById = getExpenseEntryById;
const updateExpenseEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [updated] = yield Expense.update(req.body, {
            where: { id: id },
        });
        if (updated) {
            const updatedExpense = yield Expense.findOne({ where: { id: id } });
            return res.status(200).json({ expense: updatedExpense });
        }
        else {
            throw new Error("Expense entry not found");
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.updateExpenseEntry = updateExpenseEntry;
const deleteExpenseEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield Expense.destroy({
            where: { id: id },
        });
        if (deleted) {
            return res.status(204).send("Expense entry deleted");
        }
        else {
            throw new Error("Expense entry not found");
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.deleteExpenseEntry = deleteExpenseEntry;
