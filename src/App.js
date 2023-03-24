import {Switch,Route} from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
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
   </Switch>
   </RootLayout>
  );
}

export default App;
