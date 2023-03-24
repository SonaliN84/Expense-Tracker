import {Nav,Navbar,Container} from 'react-bootstrap';
import { NavLink,Link } from 'react-router-dom';
import './Header.css'
const Header=()=>{
   return( 
   <Navbar bg="primary" variant="dark" >
   
      <Navbar.Brand href="#home" className='mx-4'>Expense Tracker</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">About</Nav.Link>
        <Nav.Link href="#pricing">Contact us</Nav.Link>
      </Nav>
      <Nav >
          <Nav.Link><NavLink to='/Login' className='loginSignupTitles'>Login</NavLink></Nav.Link>
          <Nav.Link> <Link to='/SignUp' className='me-4 loginSignupTitles'>Sign Up</Link></Nav.Link>

     </Nav>
    
  </Navbar>)
}
export default Header;