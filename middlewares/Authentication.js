require('dotenv').config()
var jwt = require('jsonwebtoken');
let Authentication = (req, res, next) => {


    if (req.headers?.authorization) {
        let token = req.headers.authorization.split(" ")
       

        jwt.verify(token[1], process.env.SCREAT_KEY, function (err, decoded) {
            if (err) {
                return res.status(400).send({
                    "success": false,
                    "message": "Unauthorized"
                })
            } else if (decoded.userid) {
                req.body = { ...req.body, userid: decoded.userid }
                next()
            }
        });
    } else {
        return res.status(400).send({
            "success": false,
            "message": "Unauthorized"
        })
    }
   
}

module.exports = { Authentication }