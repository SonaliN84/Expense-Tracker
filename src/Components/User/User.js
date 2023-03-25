import { Fragment } from "react";
import './User.css';
import {Link} from 'react-router-dom'
import ExpenseForm from "./ExpenseData/ExpenseForm";
import ExpenseData from "./ExpenseData/ExpenseData";
const User=()=>{
  return (
    <Fragment>
    <div className="profile">
    Your profile is incomplete.
    <Link to='/ProfileUpdate' style={{color:"white",marginLeft:"8px"}}>Complete now</Link>
   
    </div>
    <div>
    <h3 style={{margin:"10px"}}>Welcome to Expense Tracker</h3>
    </div>
    <ExpenseForm/>
    <ExpenseData/>
  

    </Fragment>
  )
}
export default User;