let {Router}=require("express")
let {expensemodel}=require("../models/expensemodel")
let expenserouter=Router()
expenserouter.post("/",async(req,res)=>{
let {title,date,amount,userid}=req.body

// date to day conversion login
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let datearr=date.split("/")

let newdate=""
for(let i=datearr.length-1;i>=0;i--){
    if(i==0){
        newdate=newdate+datearr[i]
    }else{
    newdate=newdate+datearr[i]+"-"
    }
}

console.log(newdate)
const d = new Date(newdate);
let day = days[d.getDay()];


console.log(day,date,req.body)
let newmodel=new expensemodel({title,date,day,amount,userid})

await newmodel.save()
res.status(201).send({
    "status" : true,
"message": `Expense with ${userid} created successfully`
})
})


module.exports={expenserouter}