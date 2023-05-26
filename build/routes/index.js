"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const income = __importStar(require("../controllers/income"));
const expense = __importStar(require("../controllers/expense"));
const user = __importStar(require("../controllers/user"));
const userIncome = __importStar(require("../controllers/user_income"));
const userExpense = __importStar(require("../controllers/user_expense"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = (0, express_1.Router)();
// General Route
router.get("/", (req, res) => res.json({ root: "Welcome" }));
// User Routes
router.post("/register", user.createUser);
router.post("/authenticate", user.authenticate);
router.get("/:email/logout", authMiddleware_1.default, user.logout);
router.delete("/:email/deleteJWTUser", user.deleteUser);
router.get("/:email/user", authMiddleware_1.default, user.getUserByEmail);
router.put("/:email/:id/edit", authMiddleware_1.default, user.updateUsername);
router.put("/:email/:id/change_password", authMiddleware_1.default, user.changePassword);
router.delete("/:email/deleteAccount", authMiddleware_1.default, user.deleteUser);
// Incomes Routes for Authenticated Client User
router.post("/:email/incomes", authMiddleware_1.default, userIncome.createUserIncomeEntry);
router.get("/:email/incomes", authMiddleware_1.default, userIncome.getAllUserIncomes);
router.get("/:email/search_incomes", authMiddleware_1.default, userIncome.getUserIncomeEntryByName);
router.put("/:email/:id/incomes", authMiddleware_1.default, userIncome.updateUserIncomeEntry);
router.delete("/:email/:id/incomes", authMiddleware_1.default, userIncome.deleteUserIncomeEntry);
// Expenses Routes for Authenticated Client User
router.post("/:email/expenses", authMiddleware_1.default, userExpense.createUserExpenseEntry);
router.get("/:email/expenses", authMiddleware_1.default, userExpense.getAllUserExpenses);
router.get("/:email/search_expenses", authMiddleware_1.default, userExpense.getUserExpenseEntryByName);
router.put("/:email/:id/expenses", authMiddleware_1.default, userExpense.updateUserExpenseEntry);
router.delete("/:email/:id/expenses", authMiddleware_1.default, userExpense.deleteUserExpenseEntry);
// Income Routes for Authenticated Admin User
router.post("/incomes", authMiddleware_1.default, income.createIncomeEntry);
router.get("/incomes", authMiddleware_1.default, income.getAllIncomeEntries);
router.get("/incomes/:id", authMiddleware_1.default, income.getIncomeEntryById);
router.put("/incomes/:id", authMiddleware_1.default, income.updateIncomeEntry);
router.delete("/incomes/:id", authMiddleware_1.default, income.deleteIncomeEntry);
// Expense Routes for Authenticated Admin User
router.post("/expenses", authMiddleware_1.default, expense.createExpenseEntry);
router.get("/expenses", authMiddleware_1.default, expense.getAllExpenseEntries);
router.get("/expenses/:id", authMiddleware_1.default, expense.getExpenseEntryById);
router.put("/expenses/:id", authMiddleware_1.default, expense.updateExpenseEntry);
router.delete("/expenses/:id", authMiddleware_1.default, expense.deleteExpenseEntry);
exports.default = router;
