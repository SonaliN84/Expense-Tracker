import { Fragment } from "react";
import Header from "../Components/Layout.js/Header";
const RootLayout=(props)=>{
return(
    <Fragment>
        <Header/>
        <h3 style={{textAlign:"center",margin:"30px"}}>Welcome to Expense Tracker</h3>
        {props.children}
    </Fragment>
);
}
export default RootLayout;