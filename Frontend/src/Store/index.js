import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expense-slice";
import authReducer from "./auth-slice";
import themeReducer from "./theme-slice";
const store = configureStore({
  reducer: {
    expense: expenseReducer,
    auth: authReducer,
    theme: themeReducer,
  },
});
export default store;
