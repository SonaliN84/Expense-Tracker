import './ExpenseData.css';
// import ExpenseContext from '../../../Store/expense-context';
// import { useContext } from 'react';
import { useSelector } from 'react-redux';
import ExpenseItem from './ExpenseItem';
const ExpenseData=()=>{
    // const expCtx=useContext(ExpenseContext);
   const expenseList=useSelector(state=>state.expense.expenses)
  return(
    <div className="expense-data">
    <div className="text-center">
   

     

      {expenseList.map((item)=>(
        <ExpenseItem amount={item.amount} description={item.description} category={item.category} id={item.id}/>
      ))}
      </div>
    </div>
   
  )
}
export default ExpenseData;