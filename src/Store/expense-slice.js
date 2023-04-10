import {createSlice} from "@reduxjs/toolkit";

const initialExpenseState={
    expenses:[],
   editExpense:{},
   isEdit:false,
   isForm:false,
   leaderboardData:[]
}
const expenseSlice=createSlice({
    name:'expense',
    initialState:initialExpenseState,
    reducers:{
        setExpenses(state,action){
            state.expenses=action.payload;
        }, 
        setEditExpense(state,action){
            state.editExpense=action.payload
        },
        setIsEdit(state,action){
            state.isEdit=action.payload
        },
        setIsForm(state,action){
            state.isForm=action.payload
        },
        setLeaderBoardData(state,action)
        {
            state.leaderboardData=action.payload
        }

    }
})
export const expenseActions=expenseSlice.actions;
export default expenseSlice.reducer;