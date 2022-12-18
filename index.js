let express=require("express")
let {connection}=require("./Config/db")
let {Rolerouter}=require("./Routes/Roleroutes")
let {Authrouter}=require("./Routes/Authroute")
let {Authentication}=require("./middlewares/Authentication")
let {expenserouter}=require("./Routes/expenserouter")
let app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.use("/role",Rolerouter)
app.use("/",Authrouter)
app.use(Authentication)
app.use("/expense",expenserouter)
app.listen(8080,async()=>{
try{
    await connection
    console.log("connected to db")
}catch(err){
console.log(err)
}
})