import {Form,Button} from 'react-bootstrap';
import './AuthForm.css';
import { useRef } from 'react';

const SignUpForm =()=>{

    const emailInputRef=useRef();
    const passwordInputRef=useRef();
    const confirmPasswordRef=useRef();

    const submitHandler=(event)=>{
      event.preventDefault();

      const enteredEmail=emailInputRef.current.value;
      const enteredPassword=passwordInputRef.current.value;
      const enteredConfirmPassword=confirmPasswordRef.current.value;
      if(enteredPassword===enteredConfirmPassword)
      {
        let url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChjskkFF5ut3_qondDFsUOAko7B8HCDv0";
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
                    console.log("User has been succesfully signed up")
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
      else{
        alert('Confirm password must be same as Password')
      }
    }

 return (
    <Form className='Auth-form border d-grid' onSubmit={submitHandler}>
    <h3 style={{textAlign:"center"}}>Sign Up</h3>
     <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" required ref={emailInputRef}/>
    
      </Form.Group>

      <Form.Group className="mb-2" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" required ref={passwordInputRef}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" required ref={confirmPasswordRef}/>
      </Form.Group>
      
      <Button variant="primary" type="submit" >
        Submit
      </Button>
    
    

   
  </Form>
 );
}
export default SignUpForm;
