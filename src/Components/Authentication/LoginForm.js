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
        fetch(url,{
            method:'POST',
            body:JSON.stringify({
                email:enteredEmail,
                password:enteredPassword,
                returnSecureToken:true
              }),
              headers:{
                'Content-Type':'application/json'
              }
        })
        .then((response)=>{
            if(response.ok)
            {
                return response.json()
                
            }
            else{
                return response.json().then((data)=>{
                let errorMessage=data.err;
                throw new Error(errorMessage)
                })
            }
        })
        .then((data)=>{
          console.log("data login",data)
          console.log("login",data.idToken)
            // authCtx.login(data.idToken);
            const email=data.email;
            const newEmail=email.replace(/[^a-zA-z0-9 ]/g,'');

            // dispatch(authActions.login(data.idToken));

            dispatch(authActions.login({
              token:data.idToken,
              email:newEmail
            }));
            history.replace('/Users')
            console.log("user has been logged in")
            axios.get(`https://expense-tracker-c62f3-default-rtdb.firebaseio.com/expenses${newEmail}.json`)
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
                // expCtx.setExpenses(array)
                dispatch(expenseActions.setExpenses(array))
            })
        })
        .catch((err)=>{
            alert(err.message)
        })
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