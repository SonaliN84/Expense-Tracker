import {Form,Button} from 'react-bootstrap';
import './AuthForm.css';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
const LoginForm=()=>{
    const history=useHistory();
    const emailInputRef=useRef();
    const passwordInputRef=useRef();
    

    const submitHandler=(event)=>{
      event.preventDefault();

      const enteredEmail=emailInputRef.current.value;
      const enteredPassword=passwordInputRef.current.value;
     
      
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChjskkFF5ut3_qondDFsUOAko7B8HCDv0';
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
                return response.json().then((res)=>{
                    console.log("User has been succesfully logged in")
                    history.replace('/')
                })
                
            }
            else{
                return response.json().then((data)=>{
                let errorMessage='Authentication failed';
                throw new Error(errorMessage)
                })
            }
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
        <Form.Control type="email" placeholder="Enter email" required ref={emailInputRef}/>
    
      </Form.Group>

      <Form.Group className="mb-4" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required ref={passwordInputRef}/>
      </Form.Group>

      <Button variant="primary" type="submit" >
        Submit
      </Button>
    
    

   
  </Form> 
  );
}
export default LoginForm;