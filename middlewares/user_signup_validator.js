

let validator = (req, res, next) => {
    let { username, password } = req.body

    let length = username.length
    // logic to find uppercase and number ans lowercase characters
    let flag = []
    for (let i = 0; i < password.length; i++) {
        let key = password.charCodeAt(i)

        if (key >= 48 && key <= 57) {
            flag[0] = key
        }
        else if (key >= 65 && key <= 90) {
            flag[1] = key
        }
        else if (key >= 97 && key <= 122) {
            flag[2] = key
        }

    }


    if (length < 3 || length > 10) {
        return res.status(400).send({
            "success": false,
            "message": "username must contain characters between 3 to 10"
        })
    }
    else if (password.length < 8 || password.length > 15) {
        return res.status(400).send({
            "success": false,
            "message": "password must contain characters between 8 to 15"
        })
    } else if (!flag[0] || !flag[1] || !flag[2]) {
        return res.status(400).send({
            "success": false,
            "message": "password must contain atleast one uppercase letter and number and lowercase letter"
        })
    } else {
        next()
    }


}

module.exports = { validator }