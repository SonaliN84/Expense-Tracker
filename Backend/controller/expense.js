const Expense=require('../models/expense')

exports.postAddExpense=(req,res,next)=>{
    
    const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;
  
     Expense.create({
       amount:amount,
       description:description,
       category:category
    })
    .then(result=>{

        res.json(result)
    }

    )
    .catch(err=>{
        console.log(err)
    })  
}

exports.getExpenses=(req,res,next)=>{
    Expense.findAll()
    .then(expenses=>{
        res.json(expenses)
    })
}


exports.deleteExpense=(req,res,next)=>{
    const expenseId=req.params.expenseId;
    console.log(expenseId)
    Expense.findByPk(expenseId)
    .then(expense=>{
        console.log(expense)
        expense.destroy();
        res.json({})
    })
}