let mongoose=require("mongoose")



let expenseschema=mongoose.Schema({
    title:{type:String,required:true},
    amount:{type:Number,required:true},
    date:{type:String,required:true},
    day:String,
    userid:{type:String,required:true}
})

let expensemodel=mongoose.model("expense",expenseschema)

module.exports={expensemodel}