import {Nav,Navbar,Container} from 'react-bootstrap';
import { NavLink,Link } from 'react-router-dom';
import './Header.css';
import AuthContext from '../../Store/auth-context';
import { useContext } from 'react';
const Header=()=>{
   const authCtx=useContext(AuthContext)
   const logoutHandler=()=>{
    authCtx.logout();
    
  }
   return( 
   <Navbar bg="primary" variant="dark" >
   
      <Navbar.Brand href="#home" className='mx-4'>Expense Tracker</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">About</Nav.Link>
        <Nav.Link href="#pricing">Contact us</Nav.Link>
      </Nav>
      {!authCtx.isLoggedIn && (
      <Nav >
          <Nav.Link><NavLink to='/Login' className='loginSignupTitles'>Login</NavLink></Nav.Link>
          <Nav.Link> <Link to='/SignUp' className='me-4 loginSignupTitles'>Sign Up</Link></Nav.Link>

     </Nav>
      )}
      {authCtx.isLoggedIn && (
      <Nav >
          <Nav.Link><NavLink to='/Login' className='loginSignupTitles me-2' onClick={logoutHandler}>Logout</NavLink></Nav.Link>
          <Nav.Link><NavLink to='/ProfileUpdate' className='loginSignupTitles me-4'>Verify Email</NavLink></Nav.Link>
      </Nav>
      )}
    
  </Navbar>)
}
export default Header;