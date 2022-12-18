let express=require("express")
let {connection}=require("./Config/db")

let app=express()



app.listen(8080,async()=>{
try{
    await connection
    console.log("connected to db")
}catch(err){
console.log(err)
}
})