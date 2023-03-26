import {Nav,Navbar,Container,Button} from 'react-bootstrap';
import { NavLink,Link } from 'react-router-dom';
import './Header.css';
import { useDispatch,useSelector } from 'react-redux';
import { authActions } from '../../Store/auth-slice';
// import AuthContext from '../../Store/auth-context';
// import { useContext } from 'react';
const Header=()=>{
  const dispatch=useDispatch();
  const authIsLoggedIn =useSelector(state=>state.auth.isLoggedIn)
  const expData=useSelector(state=>state.expense.expenses)
  console.log()
  //  const authCtx=useContext(AuthContext)
   const logoutHandler=()=>{
   dispatch(authActions.logout());
    
  }

  const totalExpenseAmount=expData.reduce((curNumber,item)=>{
    return curNumber+Number.parseInt(item.amount);
 },0)
   return( 
   <Navbar bg="primary" variant="dark" >
   
      <Navbar.Brand href="#home" className='mx-4'>Expense Tracker</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">About</Nav.Link>
        <Nav.Link href="#pricing">Contact us</Nav.Link>
      </Nav>
      {!authIsLoggedIn && (
      <Nav >
          <Nav.Link><NavLink to='/Login' className='loginSignupTitles'>Login</NavLink></Nav.Link>
          <Nav.Link> <Link to='/SignUp' className='me-4 loginSignupTitles'>Sign Up</Link></Nav.Link>

     </Nav>
      )}
      {authIsLoggedIn && (
      <Nav >
          <Nav.Link><NavLink to='/Login' className='loginSignupTitles me-2' onClick={logoutHandler}>Logout</NavLink></Nav.Link>
          <Nav.Link><NavLink to='/ProfileUpdate' className='loginSignupTitles me-2'>Verify Email</NavLink></Nav.Link>
          {totalExpenseAmount>10000 ? <Button style={{backgroundColor:"#7C3E66"}} className='mx-2'>Activate Premium</Button>:""}
      </Nav>
      )}
    
  </Navbar>)
}
export default Header;