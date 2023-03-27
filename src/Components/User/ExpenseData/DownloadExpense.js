import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";



const DownloadExpense=()=>{
    const expenseData=useSelector(state=>state.expense.expenses);
    const data=expenseData.map((exp)=>{
        return [exp.description,exp.amount,exp.category]
    })
    // console.log("array",data)
    function makeCSV(rows){
        return rows.map(r=>r.join(",")).join("\n")

    }
    const blob=new Blob([makeCSV(data)]);
    const h=URL.createObjectURL(blob)

  return(
    <div style={{width:"750px",
    margin:"40px auto",display:"flex",justifyContent:"center",color:"white"}}>
   <Button><a href={h} download="file.csv" style={{color:"white"}}>Download Expenses</a></Button>
   </div>
  )
}
export default DownloadExpense;