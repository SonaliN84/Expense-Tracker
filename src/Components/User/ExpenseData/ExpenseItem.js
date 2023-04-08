import {Row,Col, Button} from 'react-bootstrap';
import './ExpenseItem.css';
import axios from 'axios';

import { useDispatch } from 'react-redux';
import { expenseActions } from '../../../Store/expense-slice';
import { useSelector } from 'react-redux';
const ExpenseItem=(props)=>{
    
    const dispatch=useDispatch();
    
    const authToken=useSelector(state=>state.auth.token)

    const deleteExpenseHandler=()=>{
        axios.delete(`http://localhost:3000/expense/delete-expense/${props.id}`,{headers:{"Authorization":authToken}})
        .then(()=>{
            
            axios.get('http://localhost:3000/expense',{headers:{"Authorization":authToken}})
            .then((response)=>{
                console.log(response)
                console.log(response.data,"get")
               
                
                dispatch(expenseActions.setExpenses(response.data))
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const editExpenseHandler=()=>{
      dispatch(expenseActions.setIsForm(true))
      dispatch(expenseActions.setIsEdit(true)); 
      dispatch(expenseActions.setEditExpense( {
        id:props.id,
        amount:props.amount,
        description:props.description,
        category:props.category
     }))

}
 return(
   
    <Row className='expense-row'>
        <Col >{props.description}</Col>
        <Col> {props.category}</Col>
        <Col> {props.amount}</Col>
        <Col>
            <Button onClick={editExpenseHandler} size="sm" >Edit</Button>   
         <Button onClick={deleteExpenseHandler} size="sm" className='mx-2'>x</Button>
        </Col>
        
        
      </Row>
  
 )
}
export default ExpenseItem;
