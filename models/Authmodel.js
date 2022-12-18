let mongoose=require("mongoose")

let Authschema=mongoose.Schema({
    username:{type:String,required:true },
    password:{type:String,required:true},
    role:{type:String,required:true}
})

let Authmodel=mongoose.model("user",Authschema)


module.exports={Authmodel}