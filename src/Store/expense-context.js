import React,{useState} from 'react';
 const ExpenseContext=React.createContext({
   expenses:'',
   setExpenses:()=>{}
 })

 export const ExpenseContextProvider=(props)=>{
    
    const [expenses,setExpenses]=useState([]);

    
    const contextValue={
        expenses:expenses,
        setExpenses:setExpenses

    
    }
    return (
        <ExpenseContext.Provider value={contextValue}>
            {props.children}
        </ExpenseContext.Provider>
    )
 }
 export default ExpenseContext;