import {Row,Col} from 'react-bootstrap';
import './ExpenseItem.css'
const ExpenseItem=(props)=>{
    console.log(props.amount)
 return(
   
    <Row className='expense-row'>
        <Col >{props.description}</Col>
        <Col> {props.category}</Col>
        <Col> {props.amount}</Col>
      </Row>
  
 )
}
export default ExpenseItem;
