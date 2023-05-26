import { Router } from "express";
import * as income from "../controllers/income";
import * as expense from "../controllers/expense";
import * as user from "../controllers/user";
import * as userIncome from "../controllers/user_income";
import * as userExpense from "../controllers/user_expense";
import userAuth from "../middleware/authMiddleware";
import { Request, Response } from "express";

const router = Router();

// General Route
router.get("/", (req: Request, res: Response) => res.json({ root: "Welcome" }));

// User Routes
router.post("/register", user.createUser);
router.post("/authenticate", user.authenticate);
router.get("/:email/logout", userAuth, user.logout);
router.delete("/:email/deleteJWTUser", user.deleteUser);
router.get("/:email/user", userAuth, user.getUserByEmail);
router.put("/:email/:id/edit", userAuth, user.updateUsername);
router.put("/:email/:id/change_password", userAuth, user.changePassword);
router.delete("/:email/deleteAccount", userAuth, user.deleteUser);

// Incomes Routes for Authenticated Client User
router.post("/:email/incomes", userAuth, userIncome.createUserIncomeEntry);
router.get("/:email/incomes", userAuth, userIncome.getAllUserIncomes);
router.get("/:email/search_incomes", userAuth, userIncome.getUserIncomeEntryByName);
router.put("/:email/:id/incomes", userAuth, userIncome.updateUserIncomeEntry);
router.delete("/:email/:id/incomes", userAuth, userIncome.deleteUserIncomeEntry);

// Expenses Routes for Authenticated Client User
router.post("/:email/expenses", userAuth, userExpense.createUserExpenseEntry);
router.get("/:email/expenses", userAuth, userExpense.getAllUserExpenses);
router.get("/:email/search_expenses", userAuth, userExpense.getUserExpenseEntryByName);
router.put(
  "/:email/:id/expenses",
  userAuth,
  userExpense.updateUserExpenseEntry
);
router.delete("/:email/:id/expenses", userAuth, userExpense.deleteUserExpenseEntry);

// Income Routes for Authenticated Admin User
router.post("/incomes", userAuth, income.createIncomeEntry);
router.get("/incomes", userAuth, income.getAllIncomeEntries);
router.get("/incomes/:id", userAuth, income.getIncomeEntryById);
router.put("/incomes/:id", userAuth, income.updateIncomeEntry);
router.delete("/incomes/:id", userAuth, income.deleteIncomeEntry);

// Expense Routes for Authenticated Admin User
router.post("/expenses", userAuth, expense.createExpenseEntry);
router.get("/expenses", userAuth, expense.getAllExpenseEntries);
router.get("/expenses/:id", userAuth, expense.getExpenseEntryById);
router.put("/expenses/:id", userAuth, expense.updateExpenseEntry);
router.delete("/expenses/:id", userAuth, expense.deleteExpenseEntry);

export default router;
