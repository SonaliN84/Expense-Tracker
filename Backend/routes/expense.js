const express=require('express');

const router=express.Router();

const expenseController=require('../controller/expense')

const authMiddleware=require('../middleware/auth')

router.post('/expense/add-expense',authMiddleware.authenticate,expenseController.postAddExpense)

router.get('/expense',authMiddleware.authenticate,expenseController.getExpenses)

router.delete('/expense/delete-expense/:expenseId',authMiddleware.authenticate,expenseController.deleteExpense)


module.exports=router