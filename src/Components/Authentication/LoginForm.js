import {Form,Button} from 'react-bootstrap';
import './AuthForm.css';
import { useRef} from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { authActions } from '../../Store/auth-slice';
import { expenseActions } from '../../Store/expense-slice';
import axios from 'axios';
const LoginForm=()=>{
    const dispatch=useDispatch();
    const history=useHistory();
    const emailInputRef=useRef();
    const passwordInputRef=useRef();
    //  const authCtx=useContext(AuthContext)

    const submitHandler=(event)=>{
      event.preventDefault();

      const enteredEmail=emailInputRef.current.value;
      const enteredPassword=passwordInputRef.current.value;
     
      
        let url='http://localhost:3000/user/login';
        axios.post('http://localhost:3000/user/login',{
          email:enteredEmail,
          password:enteredPassword
        })
        .then(response=>{
          console.log(response)
          dispatch(authActions.login({
              token:response.data.token,
            }))
            history.replace('/Users')
        })
        // fetch(url,{
        //     method:'POST',
        //     body:JSON.stringify({
        //         email:enteredEmail,
        //         password:enteredPassword,
        //         returnSecureToken:true
        //       }),
        //       headers:{
        //         'Content-Type':'application/json'
        //       }
        // })
        // .then((response)=>{
        //     if(response.ok)
        //     {
        //         return response.json()
                
        //     }
        //     else{
        //         return response.json().then((data)=>{
        //         let errorMessage=data.err;
        //         throw new Error(errorMessage)
        //         })
        //     }
        // })
        // .then((data)=>{/////////
          // console.log("data login",data)
          // console.log("login",data.idToken)
            // // authCtx.login(data.idToken);
            // const email=data.email;
            // const newEmail=email.replace(/[^a-zA-z0-9 ]/g,'');

            // // dispatch(authActions.login(data.idToken));

            // dispatch(authActions.login({
            //   token:data.idToken,
            //   email:newEmail
            // }));
            // history.replace('/Users')/////////
            // console.log("user has been logged in")
            // axios.get('http://localhost:3000/expense')
            // .then((response)=>{
            //     console.log(response)
            //     console.log(response.data)
                
            //   dispatch(expenseActions.setExpenses(response.data))
            // })
        // })
        // .catch((err)=>{
        //     alert(err.message)
        // })
      }
     
    


  return(
    <Form className='Auth-form border d-grid' onSubmit={submitHandler}>
    <h3 style={{textAlign:"center"}}>Login</h3>
     <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter Email" required ref={emailInputRef}/>
    
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required ref={passwordInputRef}/>
      </Form.Group>
      
      <Button variant="primary" type="submit" className='my-3'>
        Login
      </Button>
      <NavLink to='/Forgot_Password' className="mb-3" style={{textAlign:"center",textDecoration:"none"}}>Forgot password</NavLink>
    
      <p style={{textAlign:"center"}}>Don't have an account? <NavLink to='/SignUp' className="mb-3" style={{textAlign:"center",textDecoration:"none"}}>Sign Up</NavLink></p>
  </Form> 
  );
}
export default LoginForm;