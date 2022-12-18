let { Rolemodel } = require("../models/Rolemodel")


let Rolevalidator = async (req, res, next) => {
    let { name } = req.body
    let data = await Rolemodel.findOne({ name: name })
    if (name !== "admin" && name !== "user") {
        return res.status(400).send({
            "success": false,
            "message": `"Role ${name} is invalid".`
        })
    }
    else if (data) {
        return res.status(400).send({
            "success": false,
            "message": `Role with ${name} is already present.`
        })
    }
    else {
        next()
    }
}

module.exports = { Rolevalidator }