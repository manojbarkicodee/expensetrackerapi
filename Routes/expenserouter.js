let { Router } = require("express")
let { expensemodel } = require("../models/expensemodel")
let { Authorization } = require("../middlewares/Authorization")
let expenserouter = Router()


let expensefunc = (data) => {
    let arr = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0, "7": 0 }
    for (let i = 0; i < data.length; i++) {
        console.log(data[i].amount, data[i].day, i)
        switch (data[i].day) {
            case "Sunday":
                arr["1"] = arr["1"] + data[i].amount
                break;
            case "Monday":
                arr["2"] = arr["2"] + data[i].amount
                break;
            case "Tuesday":
                arr["3"] = arr["3"] + data[i].amount
                break;
            case "Wednesday":
                arr["4"] = arr["4"] + data[i].amount
                break;
            case "Thursday":
                arr["5"] = arr["5"] + data[i].amount
                break;
            case "Friday":
                arr["6"] = arr["6"] + data[i].amount
                break;
            case "Saturday":
                arr["7"] = arr["7"] + data[i].amount
                break;

        }
    }
    return arr
}
expenserouter.post("/", async (req, res) => {
    let { title, date, amount, userid } = req.body

    // date to day conversion logic
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let datearr = date.split("/")

    let newdate = ""
    for (let i = datearr.length - 1; i >= 0; i--) {
        if (i == 0) {
            newdate = newdate + datearr[i]
        } else {
            newdate = newdate + datearr[i] + "-"
        }
    }

    
    const d = new Date(newdate);
    let day = days[d.getDay()];

    ///end///
    let newmodel = new expensemodel({ title, date, day, amount, userid })

    await newmodel.save()
    res.status(201).send({
        "status": true,
        "message": `Expense  created with id:${userid}  successfully`
    })
})

expenserouter.get("/summary", Authorization, async (req, res) => {

    let { userid, role } = req.body

    if (role === "user") {
        let data = await expensemodel.find({ userid: userid })

        let indivisualuser = expensefunc(data)
        res.json(indivisualuser)

    }
    else if (role === "admin") {
        let allusersdata = []
        for (let i = 0; i < userid.length; i++) {
            let data = await expensemodel.find({ userid: userid[i] })
            let indivisualuser = expensefunc(data)
            allusersdata.push(indivisualuser)
        }
        res.json(allusersdata)

    }
})


module.exports = { expenserouter }