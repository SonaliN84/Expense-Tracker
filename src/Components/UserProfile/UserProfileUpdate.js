import {Form,Button,Row,Col} from 'react-bootstrap'
import './UserProfile.css';
import { useRef,useContext } from 'react';
import AuthContext from '../../Store/auth-context';
const UserProfileUpdate=()=>{
    const authCtx=useContext(AuthContext)
    console.log(authCtx.ProfileName)
    const inputNameRef=useRef('');
    const inputPhotoUrlRef=useRef('')
  
    const FormSubmitHandler=(event)=>{
        event.preventDefault();
       const enteredName=inputNameRef.current.value;
       const enteredPhotoUrl=inputPhotoUrlRef.current.value;

       
       let url='https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyChjskkFF5ut3_qondDFsUOAko7B8HCDv0';
       fetch(url,{
           method:'POST',
           body:JSON.stringify({
            idToken:authCtx.token,
            displayName:enteredName,
            photoUrl:enteredPhotoUrl,
            returnSecureToken:false
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
               let errorMessage='Authentication failed';
               throw new Error(errorMessage)
               })
           }
       })
       .then((data)=>{
        console.log(data);
        console.log("profile Updated")
       })
       .catch((err)=>{
           alert(err.message)
       })

      
    }

  return (
    <Form className='profile-form' onSubmit={FormSubmitHandler}>
      
        <Form.Group controlId="formGridName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text"  placeholder="Enter Name" className='mb-2' ref={inputNameRef} defaultValue={authCtx.ProfileName}/>
        </Form.Group>

        <Form.Group  controlId="formGridphoto">
          <Form.Label>Profile Photo URL</Form.Label>
          <Form.Control type="password" placeholder="Enter URL" className='mb-3' ref={inputPhotoUrlRef} defaultValue={authCtx.profilePhotoUrl} />
        </Form.Group>
     
      
      <Button variant="primary" type="submit">
        Update
      </Button>
      </Form>
  )
}
export default UserProfileUpdate;