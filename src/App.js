import {Switch,Route, Redirect} from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Users from './pages/Users';
import ProfileUpdate from './pages/ProfileUpdate';
import RootLayout from './pages/RootLayout';
import { useEffect,useContext } from 'react';

import { expenseActions } from './Store/expense-slice';

import Forgot_Password from './pages/Forgot_Password';
import axios from 'axios';

import { useSelector,useDispatch } from 'react-redux';
import { authActions } from './Store/auth-slice';
import Leaderboard from './pages/Leaderboard';
import DownloadHistory from './pages/DownloadHistory';

function App() {
  
const theme=useSelector(state=>state.theme.theme)
// console.log(theme)
const dispatch=useDispatch();
const authToken=useSelector(state=>state.auth.token)
const authIsLoggedIn=useSelector(state=>state.auth.isLoggedIn)
const authIsPremium=useSelector(state=>state.auth.isPremium)
const activePage=useSelector(state=>state.auth.activePage)

  const LIMIT=useSelector(state=>state.auth.limit)
  console.log("activrepage",activePage)


useEffect(()=>{
 
  console.log(authIsLoggedIn)
  if(authIsLoggedIn){


  // let url='https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyChjskkFF5ut3_qondDFsUOAko7B8HCDv0';
  // fetch(url,{
  //     method:'POST',
  //     body:JSON.stringify({
      
  //        idToken:authToken
        
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
  //         let errorMessage='Authentication failed';
  //         throw new Error(errorMessage)
  //         })
  //     }
  // })
  // .then((data)=>{
      
  //   console.log("data",data)
  //   console.log(data.users[0].displayName);
  //   console.log(data.users[0].photoUrl)
  //  dispatch(authActions.setProfileName(data.users[0].displayName))
  //   dispatch(authActions.setprofilePhotoUrl(data.users[0].photoUrl))

  // })
  // .catch((err)=>{
  //  console.log(err)
  // })
  axios.get('http://localhost:3000/expense/downloadHistory',{headers:{"Authorization":authToken}})
  .then((response)=>{
    const array=[];
    for(let i=response.data.length-1;i>=0;i--)
    {
      array.push(response.data[i])
    }
    dispatch(expenseActions.setDownloadHistory(array))
   console.log(array)
  })

 
      if(authIsPremium){
           axios.get('http://localhost:3000/premium/showleaderboard',{headers:{"Authorization":authToken}})
            .then((response)=>{
             console.log(response.data)
             
             dispatch(expenseActions.setLeaderBoardData(response.data))
             
            })
          }
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
    {authIsLoggedIn && <Route path='/Users' exact>
        <Users/>
    </Route>}
    {!authIsLoggedIn && <Route path='/Users' exact>
       <Redirect to='/Login'/>
    </Route>}
    
    <Route path='/ProfileUpdate'>
      <ProfileUpdate/>
    </Route>
    <Route path='/Forgot_Password'>
      <Forgot_Password/>
    </Route>
    {authIsLoggedIn && authIsPremium && <Route path='/Leaderboard'>
      <Leaderboard/>
    </Route>}
    {!authIsLoggedIn && <Route path='/Leaderboard'>
    <Redirect to='/Login'/>
    </Route>}
    {authIsLoggedIn && !authIsPremium && <Route path='/Leaderboard'>
    <Redirect to='/Users'/>
    </Route>}
    <Route path='/DownloadHistory'>
      <DownloadHistory/>
    </Route>

   </Switch>
   </RootLayout>
   </div>
  );
}

export default App;
