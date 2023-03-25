import {Switch,Route} from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Users from './pages/Users';
import ProfileUpdate from './pages/ProfileUpdate';
import RootLayout from './pages/RootLayout';
import { useEffect,useContext } from 'react';
import AuthContext from './Store/auth-context';
import Forgot_Password from './pages/Forgot_Password';
function App() {
const authCtx=useContext(AuthContext)
useEffect(()=>{
  if(authCtx.isLoggedIn){
  let url='https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyChjskkFF5ut3_qondDFsUOAko7B8HCDv0';
  fetch(url,{
      method:'POST',
      body:JSON.stringify({
        idToken:authCtx.token
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
      
    console.log("data",data)
    console.log(data.users[0].displayName);
    console.log(data.users[0].photoUrl)
    authCtx.setProfileName(data.users[0].displayName)
    authCtx.setprofilePhotoUrl(data.users[0].photoUrl)

  })
  .catch((err)=>{
   console.log(err)
  })
}
},[])



  return (
   
   <RootLayout>
   <Switch>
    
    <Route path='/SignUp'>
      <SignUp/>
    </Route>
    <Route path='/Login'>
      <Login/>
    </Route>
    <Route path='/Users'>
      <Users/>
    </Route>
    <Route path='/ProfileUpdate'>
      <ProfileUpdate/>
    </Route>
    <Route path='/Forgot_Password'>
      <Forgot_Password/>
    </Route>
   </Switch>
   </RootLayout>
  );
}

export default App;
