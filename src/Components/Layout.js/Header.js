import {Nav,Navbar,Container,Button} from 'react-bootstrap';
import { NavLink,Link } from 'react-router-dom';
import './Header.css';
import { useDispatch,useSelector } from 'react-redux';
import { authActions } from '../../Store/auth-slice';
import { themeActions } from '../../Store/theme-slice';
import { expenseActions } from '../../Store/expense-slice';
// import AuthContext from '../../Store/auth-context';
import { Provider } from 'react-redux';
import store from '../../Store/index'
import { BrowserRouter } from 'react-router-dom';
// import { useContext } from 'react';
const Header=()=>{
 
        
  const dispatch=useDispatch();
  const authIsLoggedIn =useSelector(state=>state.auth.isLoggedIn)
  const expData=useSelector(state=>state.expense.expenses)
 
  //  const authCtx=useContext(AuthContext)
   const logoutHandler=()=>{
   
   dispatch(authActions.logout());
    dispatch(expenseActions.setExpenses([]))
  }

  const changeThemeHandler=()=>{
     dispatch(themeActions.toggleTheme())
  }

  const totalExpenseAmount=expData.reduce((curNumber,item)=>{
    return curNumber+Number.parseInt(item.amount);
 },0)
   return(
   
    <Provider store={store}> 
   <Navbar bg="primary" variant="dark" >
   
      <Navbar.Brand href="#home" className='mx-4'>Expense Tracker</Navbar.Brand>
      <Nav className="me-auto">
        {/* <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">About</Nav.Link>
        <Nav.Link href="#pricing">Contact us</Nav.Link> */}
      </Nav>
      {!authIsLoggedIn && (
      <Nav >
      <div className="form-check form-switch my-2">
       <input className="form-check-input bg-secondary" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={changeThemeHandler}/>
  
       </div>
          <Nav.Link><NavLink to='/Login' className='loginSignupTitles'>Login</NavLink></Nav.Link>
          <Nav.Link> <Link to='/SignUp' className='me-4 loginSignupTitles'>Sign Up</Link></Nav.Link>

     </Nav>
      )}
      {authIsLoggedIn && (
      <Nav >
      <div className="form-check form-switch my-2">
       <input className="form-check-input bg-secondary" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={changeThemeHandler}/>
  
       </div>
          <Nav.Link><NavLink to='/Login' className='loginSignupTitles me-2' onClick={logoutHandler}>Logout</NavLink></Nav.Link>
          <Nav.Link><NavLink to='/ProfileUpdate' className='loginSignupTitles'>Verify Email</NavLink></Nav.Link>
          {totalExpenseAmount>10000 ? <Button style={{backgroundColor:"#7C3E66"}} className='mx-2'>Activate Premium</Button>:""}
          {/* <Button onClick={changeThemeHandler}>Theme</Button> */}
         
      </Nav>
      )}
    
  </Navbar>

   </Provider>
   )
}
export default Header;