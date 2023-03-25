import './ExpenseData.css';
import ExpenseContext from '../../../Store/expense-context';
import { useContext } from 'react';
import ExpenseItem from './ExpenseItem';
const ExpenseData=()=>{
    const expCtx=useContext(ExpenseContext);
   
  return(
    <div className="expense-data">
    <div className="text-center">
   

     

      {expCtx.expenses.map((item)=>(
        <ExpenseItem amount={item.amount} description={item.description} category={item.category} id={item.id}/>
      ))}
      </div>
    </div>
   
  )
}
export default ExpenseData;