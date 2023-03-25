import { Button,Form } from "react-bootstrap";
import { useRef, useState } from "react";
const ForgotPassword=()=>{

  const [isLoading,setIsLoading]=useState(false);

  const emailInputRef=useRef('');
  const submitHandler=(event)=>{
    setIsLoading(true)
   event.preventDefault();
   const enteredEmail=emailInputRef.current.value;

   let url='https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyChjskkFF5ut3_qondDFsUOAko7B8HCDv0';
        fetch(url,{
            method:'POST',
            body:JSON.stringify({
                requestType:"PASSWORD_RESET",
                email:enteredEmail
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
                    console.log("err",data)
                let errorMessage=data.error.message;
                throw new Error(errorMessage)
                })
            }
        })
        .then((data)=>{
            setIsLoading(false)
            
           console.log(data)
        })
        .catch((err)=>{
            alert(err.message)
        })
  }
  return (
  
  <Form className='Auth-form border d-flex flex-column' onSubmit={submitHandler}>

   <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Enter the email which you have registered</Form.Label>
      <Form.Control type="email" placeholder="Enter email" required ref={emailInputRef}/>
  
    </Form.Group>

   
    <Button variant="primary" type="submit" className="align-self-center">
      {!isLoading && <div>Send Link</div>}
     {isLoading && <div class="spinner-border spinner-border-sm" role="status">
  <span class="visually-hidden">Loading...</span>
</div>}
    </Button>
  
  

 
</Form> )
}
export default ForgotPassword;