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
exports.deleteIncomeEntry = exports.updateIncomeEntry = exports.getIncomeEntryById = exports.getAllIncomeEntries = exports.createIncomeEntry = void 0;
const models_1 = __importDefault(require("../models"));
const { Income } = models_1.default;
const createIncomeEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const income = yield Income.create(req.body);
        if (income) {
            return res.status(201).json({ income });
        }
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createIncomeEntry = createIncomeEntry;
const getAllIncomeEntries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incomes = yield Income.findAll();
        if (incomes) {
            return res.status(200).json({ incomes });
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getAllIncomeEntries = getAllIncomeEntries;
const getIncomeEntryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const income = yield Income.findOne({
            where: { id: id },
        });
        if (income) {
            return res.status(200).json({ income });
        }
        else {
            res.status(404).send("Income entry with specified ID does not exist");
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
exports.getIncomeEntryById = getIncomeEntryById;
const updateIncomeEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const [updated] = yield Income.update(req.body, {
            where: { id: id },
        });
        if (updated) {
            const updateIncome = yield Income.findOne({ where: { id: id } });
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
exports.updateIncomeEntry = updateIncomeEntry;
const deleteIncomeEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted = yield Income.destroy({
            where: { id: id },
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
exports.deleteIncomeEntry = deleteIncomeEntry;
