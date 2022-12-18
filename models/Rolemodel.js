let mongoose=require("mongoose")

let shema=mongoose.Schema({
    name:String
})

let Rolemodel=mongoose.model("role",shema)

module.exports={Rolemodel}