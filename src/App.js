import {Switch,Route} from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Users from './pages/Users';
import ProfileUpdate from './pages/ProfileUpdate';
import RootLayout from './pages/RootLayout';
function App() {
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
   </Switch>
   </RootLayout>
  );
}

export default App;
