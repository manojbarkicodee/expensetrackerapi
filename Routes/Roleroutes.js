let {Router}=require("express")
let {Rolevalidator}=require("../middlewares/Rolevalidator")
let {Rolemodel}=require("../models/Rolemodel")

let Rolerouter=Router()

Rolerouter.post("/",Rolevalidator,async(req,res)=>{

    let {name}=req.body
let newdata=new Rolemodel({name:name})

await newdata.save()


let {_id}=await Rolemodel.findOne({name:name})

res.status(201).send({
    success: true,
    message: "Role created successfully",
    id: _id
    })
  
})

module.exports={Rolerouter}