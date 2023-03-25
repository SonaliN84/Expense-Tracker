import {Form,Col,Row,Button} from 'react-bootstrap';
import './ExpenseForm.css';
import {useState,useContext,useRef} from 'react';
import ExpenseContext from '../../../Store/expense-context';

const ExpenseForm=()=>{
   const inputAmountRef=useRef('')
   const inputDescriptionRef=useRef('')
   const inputCategoryRef=useRef('')

    const expCtx=useContext(ExpenseContext)
    const [isForm,setIsForm]=useState(false)
    const openExpenseFormHandler=()=>{
        setIsForm(true)
    }
    const submitFormHandler=(event)=>{
        event.preventDefault();
       
        const enteredAmount=inputAmountRef.current.value
        const enteredDescription=inputDescriptionRef.current.value
        const enteredCategory=inputCategoryRef.current.value

        let expense={
            amount:enteredAmount,
            description:enteredDescription,
            category:enteredCategory
        }
        expCtx.setExpenses((prev)=>{
            return [...prev,expense]
        })
    }
    const closeExpenseFormHandler=()=>{
        setIsForm(false) 
    }
 return(
    <div className='expense-form'>
   {!isForm && <div className='d-flex justify-content-center align-items-center'>
        <Button onClick={openExpenseFormHandler}>Add Expense</Button>
    </div>}
    {isForm && <Form onSubmit={submitFormHandler}>
    <Row>
      <Col>
        <Form.Control placeholder="Description" className='mx-2 my-4' ref={inputDescriptionRef} required/>
      </Col>
      <Col>
        <Form.Control placeholder="Amount" className='my-4' ref={inputAmountRef} required/>
      </Col>
    </Row>
    <Row >
      <Col>
      <Form.Select aria-label="Default select example"className='mx-2' ref={inputCategoryRef}>
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
      
      <Button type="submit">submit</Button>
      <Button onClick={closeExpenseFormHandler} className="mx-2">cancel</Button>
      

      </Col>
      
    </Row>

  </Form>}
  </div>
 )
}
export default ExpenseForm;