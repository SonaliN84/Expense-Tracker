import {Switch,Route, Redirect} from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Users from './pages/Users';
import ProfileUpdate from './pages/ProfileUpdate';
import RootLayout from './pages/RootLayout';
import { useEffect,useContext } from 'react';

import { expenseActions } from './Store/expense-slice';
// import AuthContext from './Store/auth-context';
import Forgot_Password from './pages/Forgot_Password';
import axios from 'axios';
// import ExpenseContext from './Store/expense-context';
import { useSelector,useDispatch } from 'react-redux';
import { authActions } from './Store/auth-slice';

function App() {
  // const authCtx=useContext(AuthContext)
const theme=useSelector(state=>state.theme.theme)
// console.log(theme)
const dispatch=useDispatch();
const authToken=useSelector(state=>state.auth.token)
const authIsLoggedIn=useSelector(state=>state.auth.isLoggedIn)
// const expCtx=useContext(ExpenseContext)

useEffect(()=>{
  
  console.log(authIsLoggedIn)
  if(authIsLoggedIn){

  let url='https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyChjskkFF5ut3_qondDFsUOAko7B8HCDv0';
  fetch(url,{
      method:'POST',
      body:JSON.stringify({
        // idToken:authCtx.token
         idToken:authToken
        
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
   dispatch(authActions.setProfileName(data.users[0].displayName))
    dispatch(authActions.setprofilePhotoUrl(data.users[0].photoUrl))

  })
  .catch((err)=>{
   console.log(err)
  })

  axios.get('http://localhost:3000/expense',{headers:{"Authorization":authToken}})
            .then((response)=>{
                console.log(response)
                console.log(response.data)
                
              dispatch(expenseActions.setExpenses(response.data))
            })
}
},[authIsLoggedIn])

useEffect(() => {
   const theme=localStorage.getItem('theme')
   document.body.className = theme;
}, [theme]);


  return (
   <div>
   <RootLayout>
   <Switch>
   {authIsLoggedIn && <Route path='/' exact>
       <Redirect to='/Users'/>
    </Route>}
    {!authIsLoggedIn && <Route path='/' exact>
       <Redirect to='/Login'/>
    </Route>}
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
   </div>
  );
}

export default App;
