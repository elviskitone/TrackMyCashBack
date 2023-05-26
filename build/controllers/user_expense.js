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
exports.deleteUserExpenseEntry = exports.updateUserExpenseEntry = exports.getUserExpenseEntryByName = exports.getAllUserExpenses = exports.createUserExpenseEntry = void 0;
const models_1 = __importDefault(require("../models"));
const sequelize_1 = require("sequelize");
const { User, Expense } = models_1.default;
const createUserExpenseEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const user = yield User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const expense = yield Expense.create({
            name: req.body.name,
            value: req.body.value,
            user_email: user.email,
        });
        if (expense) {
            return res.status(201).json({ expense });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createUserExpenseEntry = createUserExpenseEntry;
const getAllUserExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const user = yield User.findOne({
            where: { email },
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        const expense = yield Expense.findAll({
            where: {
                user_email: user.email,
            },
        });
        if (expense) {
            res.status(200).json({ expense });
        }
        else {
            res.status(404).send("Expense entry with specified name does not exist");
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.getAllUserExpenses = getAllUserExpenses;
const getUserExpenseEntryByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const user = yield User.findOne({
            where: { email },
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        const expense = yield Expense.findAll({
            where: {
                user_email: user.email,
                name: {
                    [sequelize_1.Op.like]: `%${req.body.name}%`,
                },
            },
        });
        if (expense) {
            res.status(200).json({ expense });
        }
        else {
            res.status(404).send("Expense entry with specified name does not exist");
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.getUserExpenseEntryByName = getUserExpenseEntryByName;
const updateUserExpenseEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { email } = req.params;
        const user = yield User.findOne({
            where: { email },
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        const [updated] = yield Expense.update(req.body, {
            where: {
                user_email: email,
                id: id,
            },
        });
        if (updated) {
            const updateExpense = yield Expense.findOne({
                where: {
                    id,
                    user_email: email,
                },
            });
            return res.status(200).json({ expense: updateExpense });
        }
        else {
            throw new Error("Expense entry not found");
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.updateUserExpenseEntry = updateUserExpenseEntry;
const deleteUserExpenseEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { email } = req.params;
        const user = yield User.findOne({
            where: { email },
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        const deleted = yield Expense.destroy({
            where: {
                user_email: email,
                id: id,
            },
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
exports.deleteUserExpenseEntry = deleteUserExpenseEntry;
