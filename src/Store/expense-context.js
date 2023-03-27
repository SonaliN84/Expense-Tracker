import React,{useState} from 'react';
 const ExpenseContext=React.createContext({
   expenses:'',
   setExpenses:()=>{},
   editExpense:'',
   setEditExpense:()=>{},
   isEdit:'',
   setIsEdit:()=>{},
   editHandler:()=>{},
   isForm:'',
   setIsForm:()=>{}
 })

 export const ExpenseContextProvider=(props)=>{
    
    const [expenses,setExpenses]=useState([]);
    const [editExpense,setEditExpense]=useState({});
    const [isEdit,setIsEdit]=useState(false)
    const [isForm,setIsForm]=useState(false)
    const editHandler=()=>{

    }
    const contextValue={
        expenses:expenses,
        setExpenses:setExpenses,
        editExpense:editExpense,
        setEditExpense:setEditExpense,
        isEdit:isEdit,
        setIsEdit:setIsEdit,
        editHandler:editHandler,
        isForm:isForm,
       setIsForm:setIsForm
    }
    return (
        <ExpenseContext.Provider value={contextValue}>
            {props.children}
        </ExpenseContext.Provider>
    )
 }
 export default ExpenseContext;