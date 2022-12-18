let { Rolemodel } = require("../models/Rolemodel")
let { Authmodel } = require("../models/Authmodel")
let Authorization = async (req, res, next) => {

    let { userid } = req.body

    let data = await Authmodel.findOne({ _id: userid })


    if (data) {
        let { name } = await Rolemodel.findOne({ _id: data.role })

        if (name === "admin") {
            let users_required_id = await Authmodel.find()
            let newids = users_required_id.map((el) => {
                return el._id
            })
            req.body = { ...req.body, userid: newids ,role:"admin"}
            next()
            console.log(newids)
        }
        else if (name === "user") {
            req.body = { ...req.body, role: name }
            next()
        }
    }
    else {
        return res.status(400).send({
            "success": false,
            "message": "Unauthorized"
        })
    }


}

module.exports = { Authorization }