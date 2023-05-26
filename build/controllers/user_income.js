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
exports.deleteUserIncomeEntry = exports.updateUserIncomeEntry = exports.getUserIncomeEntryByName = exports.getAllUserIncomes = exports.createUserIncomeEntry = void 0;
const models_1 = __importDefault(require("../models"));
const sequelize_1 = require("sequelize");
const { User, Income } = models_1.default;
const createUserIncomeEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const user = yield User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const income = yield Income.create({
            name: req.body.name,
            value: req.body.value,
            user_email: user.email,
        });
        if (income) {
            return res.status(201).json({ income });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createUserIncomeEntry = createUserIncomeEntry;
const getAllUserIncomes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const user = yield User.findOne({
            where: { email },
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        const income = yield Income.findAll({
            where: {
                user_email: user.email,
            },
        });
        if (income) {
            res.status(200).json({ income });
        }
        else {
            res.status(404).send("Income entry with specified name does not exist");
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.getAllUserIncomes = getAllUserIncomes;
const getUserIncomeEntryByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.params;
        const user = yield User.findOne({
            where: { email },
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        const income = yield Income.findAll({
            where: {
                user_email: user.email,
                name: {
                    [sequelize_1.Op.like]: `%${req.body.name}%`,
                },
            },
        });
        if (income.length > 0) {
            res.status(200).json({ income });
        }
        else {
            res.status(404).send("Income entry with specified name does not exist");
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.getUserIncomeEntryByName = getUserIncomeEntryByName;
const updateUserIncomeEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { email } = req.params;
        const user = yield User.findOne({
            where: { email },
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        const [updated] = yield Income.update(req.body, {
            where: {
                user_email: email,
                id: id,
            },
        });
        if (updated) {
            const updateIncome = yield Income.findOne({
                where: {
                    id,
                    user_email: email,
                },
            });
            return res.status(200).json({ income: updateIncome });
        }
        else {
            throw new Error("Income entry not found");
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.updateUserIncomeEntry = updateUserIncomeEntry;
const deleteUserIncomeEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { email } = req.params;
        const user = yield User.findOne({
            where: { email },
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        const deleted = yield Income.destroy({
            where: {
                user_email: email,
                id: id,
            },
        });
        if (deleted) {
            return res.status(204).send("Income entry deleted");
        }
        else {
            throw new Error("Income entry not found");
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.deleteUserIncomeEntry = deleteUserIncomeEntry;
