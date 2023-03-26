import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { AuthContextProvider } from './Store/auth-context';
import { Provider } from 'react-redux';
import store from './Store/index'
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import '../node_modules/react-bootstrap/dist/react-bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { ExpenseContextProvider } from './Store/expense-context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <ExpenseContextProvider>
  {/* <AuthContextProvider> */}
   <BrowserRouter>

   <Provider store={store}>
             <App />
          </Provider>
  </BrowserRouter>
  {/* </AuthContextProvider> */}
  </ExpenseContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
