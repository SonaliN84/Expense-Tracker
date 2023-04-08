const Expense=require('../models/expense')

function isStringInValid(string){
    if(string===undefined ||string===null ||string.length===0){
        return true;
    }
    else{
        return false;
    }
}


exports.postAddExpense=async(req,res,next)=>{
    try{
    const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;

    if(isStringInValid(description) || isStringInValid(category) || amount==undefined || amount===null || amount<0)
    {
        return res.status(400).json({err:"Bad parameters"})
    }
  
   const expense= await req.user.createExpense({
       amount:amount,
       description:description,
       category:category
    })
   
    return res.status(201).json(expense)
  }
  catch(err){
        console.log(err)
       return res.status(500).json({error:err,success:false})
    }  
}

exports.getExpenses=async(req,res,next)=>{
    try{
    const expenses=await req.user.getExpenses()
     return res.status(200).json(expenses)
    }
    catch(err){
    return res.status(500).json({error:err,success:false}) 
    }
}


exports.deleteExpense=async(req,res,next)=>{
    try{
    const expenseId=req.params.expenseId;

    if(expenseId==undefined || expenseId.length===0)
    {
        return res.status(400).json({success:false,message:"Bad parameters"})
    }
   
    const expenses=await req.user.getExpenses({where:{id:expenseId}})
      const expense=expenses[0]
      expense.destroy();
     
     return  res.status(200).json({success:true,message:"Deleted successfully"})
    }
    catch(err){
        return res.status(500).json({error:err,success:false}) 
        }
}