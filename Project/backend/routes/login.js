const router = require('express').Router();
let Visit = require('../models/visit.model');
const { Telegraf } = require("telegraf");
const {getFormattedDate} = require("../controllers/dateformat");
const Doctor = require('../models/doctor.model');


router.post("/", async (req, res) => {
    try {  
        let doctor = await Doctor.findOne({name: req.body.name, surname: req.body.surname})
        console.log(doctor);
        if (doctor.password == req.body.password){
            res.sendStatus(200);
        }else{
            res.sendStatus(400);
        }
    } catch (error) {
      res.send(error);
    }
});


module.exports = router