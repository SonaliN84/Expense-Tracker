import {Row,Col, Button} from 'react-bootstrap';
import './ExpenseItem.css';
import axios from 'axios';
import { useContext } from 'react';
// import ExpenseContext from '../../../Store/expense-context';
import { useDispatch } from 'react-redux';
import { expenseActions } from '../../../Store/expense-slice';
const ExpenseItem=(props)=>{
    // const expCtx=useContext(ExpenseContext)
    const dispatch=useDispatch();
    const deleteExpenseHandler=()=>{
        axios.delete(`https://expense-tracker-c62f3-default-rtdb.firebaseio.com/expenses/${props.id}.json`)
        .then(()=>{
            console.log("del")
            axios.get('https://expense-tracker-c62f3-default-rtdb.firebaseio.com/expenses.json')
            .then((response)=>{
                console.log(response)
                console.log(response.data,"get")
                let array=[];
                if(response.data){
                Object.keys(response.data).forEach((key)=>{
                    let obj={
                        id:key,
                        amount:response.data[key].amount,
                        description:response.data[key].description,
                        category:response.data[key].category
                    }
                    array.push(obj)
                    
                    
                    console.log(obj)
                })
            }
                dispatch(expenseActions.setExpenses(array))
            })
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



        // axios.put(`https://expense-tracker-c62f3-default-rtdb.firebaseio.com/expenses/${props.id}.json`,
        // {
        //    amount:props.amount,
        //    description:props.description,
        //    category:props.category
        // })
        // .then(()=>{
        //     axios.get('https://expense-tracker-c62f3-default-rtdb.firebaseio.com/expenses.json')
        //     .then((response)=>{
        //         console.log(response)
        //         console.log(response.data)
        //         let array=[];
        //         Object.keys(response.data).forEach((key)=>{
        //             let obj={
        //                 id:key,
        //                 amount:response.data[key].amount,
        //                 description:response.data[key].description,
        //                 category:response.data[key].category
        //             }
        //             array.push(obj)
                    
                    
        //             console.log(obj)
        //         })
        //         expCtx.setExpenses(array)
        //     })
        // }) 
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
