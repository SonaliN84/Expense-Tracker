import {Form,Col,Row,Button} from 'react-bootstrap';
import './ExpenseForm.css';
import {useState,useContext,useRef} from 'react';
import ExpenseContext from '../../../Store/expense-context';
import axios from 'axios'
const ExpenseForm=()=>{
   const inputAmountRef=useRef('')
   const inputDescriptionRef=useRef('')
   const inputCategoryRef=useRef('')
   const expCtx=useContext(ExpenseContext)

    
    const openExpenseFormHandler=()=>{
        expCtx.setIsForm(true)
    }
    const submitFormHandler=(event)=>{
        event.preventDefault();
        console.log(expCtx.editExpense.description)
        console.log("hey",expCtx.editExpense)
        const enteredAmount=inputAmountRef.current.value
        const enteredDescription=inputDescriptionRef.current.value
        const enteredCategory=inputCategoryRef.current.value

        let expense={
            amount:enteredAmount,
            description:enteredDescription,
            category:enteredCategory
        }
         
        let newExpense=JSON.stringify(expense)
        if(!expCtx.isEdit){
        axios.post('https://expense-tracker-c62f3-default-rtdb.firebaseio.com/expenses.json',newExpense)
        .then((response)=>{
            console.log(response.data)
            axios.get('https://expense-tracker-c62f3-default-rtdb.firebaseio.com/expenses.json')
            .then((response)=>{
                console.log(response)
                console.log(response.data)
                expCtx.setIsForm(false)
                let array=[];
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
                expCtx.setExpenses(array)
            })
        })

    }
    else{
        let id=expCtx.editExpense.id
        axios.put(`https://expense-tracker-c62f3-default-rtdb.firebaseio.com/expenses/${id}.json`,expense)
        .then(()=>{
            expCtx.setIsEdit(false);
            
            expCtx.setIsForm(false)
            axios.get('https://expense-tracker-c62f3-default-rtdb.firebaseio.com/expenses.json')
            .then((response)=>{
                console.log(response)
                console.log(response.data)
                let array=[];
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
                expCtx.setExpenses(array)
            })
        })  
    }
  
        
    }
    const closeExpenseFormHandler=()=>{
        expCtx.setIsForm(false) 
    }
 return(
    <div className='expense-form'>
   {!expCtx.isForm && <div className='d-flex justify-content-center align-items-center'>
        <Button onClick={openExpenseFormHandler}>Add Expense</Button>
    </div>}
    {expCtx.isForm && <Form onSubmit={submitFormHandler}>
    <Row>
      <Col>
        <Form.Control placeholder="Description" className='mx-2 my-4' ref={inputDescriptionRef} required defaultValue={expCtx.editExpense.description}/>
      </Col>
      <Col>
        <Form.Control placeholder="Amount" className='my-4' ref={inputAmountRef} required defaultValue={expCtx.editExpense.amount}/>
      </Col>
    </Row>
    <Row >
      <Col>
      <Form.Select aria-label="Default select example"className='mx-2' ref={inputCategoryRef} >
      <option value="Fuel">Fuel</option>
      <option value="Food">Food</option>
      <option value="Electricity">Electricity</option>
      <option value="Shopping">Shopping</option>
    </Form.Select>
      </Col>
      <Col>
       </Col>
    </Row>
    <Row>
    <Col ></Col>
    <Col className='d-flex flex-row-reverse'>
      
      {!expCtx.isEdit && <Button type="submit">submit</Button>}
      {expCtx.isEdit && <Button type="submit">Update</Button>}
      <Button onClick={closeExpenseFormHandler} className="mx-2">cancel</Button>
      

      </Col>
      
    </Row>

  </Form>}
  </div>
 )
}
export default ExpenseForm;