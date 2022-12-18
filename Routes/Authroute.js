let {Router}=require("express")
let {validator}=require("../middlewares/user_signup_validator")
var bcrypt = require('bcryptjs');
let {Authmodel}=require("../models/Authmodel")
require('dotenv').config()
var jwt = require('jsonwebtoken');
let Authrouter=Router()


Authrouter.post("/signup",validator,async(req,res)=>{
let {username,password,role}=req.body
let data=await Authmodel.findOne({username:username})

if(data){
    return res.status(400).send({
        "success": false,
        "message": `Username ${username} already present`
        })
}
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(password, salt);
console.log(hash)
let newdata= new Authmodel({username:username,password:hash,role:role})

await newdata.save()

    res.status(201).send({
        "success":true
    })
})

Authrouter.post("/login",async(req,res)=>{
    
    let {username,password}=req.body
    let data=await Authmodel.findOne({username:username})
    if(!data){
      return res.status(400).send({"success": false,
      "message": "Username/Password is invalid"})
    }
    bcrypt.compare(password, data.password, function(err, response) {
        // res === true
if(response){
    var token = jwt.sign({ userid:data._id }, process.env.SCREAT_KEY);
    return res.status(200).send({
        "success": true,
"token": token
    })
}else{
    return res.status(400).send({"success": false,
    "message": "Username/Password is invalid"})
}
    });
  
})

module.exports={Authrouter}