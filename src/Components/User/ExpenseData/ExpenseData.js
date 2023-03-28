import './ExpenseData.css';
// import ExpenseContext from '../../../Store/expense-context';
// import { useContext } from 'react';
import { useSelector } from 'react-redux';
import ExpenseItem from './ExpenseItem';
const ExpenseData=()=>{
  const expData=useSelector(state=>state.expense.expenses)
    // const expCtx=useContext(ExpenseContext);
   const expenseList=useSelector(state=>state.expense.expenses)
   const totalExpenseAmount=expData.reduce((curNumber,item)=>{
    return curNumber+Number.parseInt(item.amount);
 },0)
  return(
    <div className="expense-data">
    {expenseList.length===0 && <div className="text-center"><h5>No expenses found!!</h5></div>}
   {expenseList.length>0 && <div className="text-center">
       {expenseList.map((item)=>(
        <ExpenseItem amount={item.amount} description={item.description} category={item.category} id={item.id}/>
      ))}
      <h5>Total Expense Amount=Rs. {totalExpenseAmount}</h5>
      </div>}
    </div>
   
  )
}
export default ExpenseData;