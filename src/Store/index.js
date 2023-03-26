import {configureStore} from '@reduxjs/toolkit';
import expenseReducer from './expense-slice'
import authReducer from './auth-slice'

const store=configureStore({
    
    reducer:{
      expense:expenseReducer,
      auth:authReducer
    }
  });
  export default store;