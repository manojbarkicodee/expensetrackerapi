

let Expense_validator=(req,res,next)=>{

    let {title,amount,date}=req.body
let arr=date.split("/").map(Number)
    if(title.length<3||title.length>10){
        res.status(400).send({
            "success":false,
            "message":"Title must be contain 3 to 10 characters"
        })
    }else if(amount<1||amount>1000){
        res.status(400).send({
            "success":false,
            "message":"amount must between 1 to 1000"
        })
    }else if(arr[0]>31||arr[1]>12||arr[2]<=31){
        res.status(400).send({
            "success":false,
            "message":"date must follows dd/mm/yyyy format"
        })
    }else{
        next()
    }

}

module.exports={Expense_validator}