const router = require('express').Router();
let Visit = require('../models/visit.model');
const { Telegraf } = require("telegraf");
const {getFormattedDate} = require("../controllers/dateformat");
const Patient = require('../models/patient.model');

let MedBot = new Telegraf("1660503992:AAFS8OT8RFktrRB9byz5i6LhFZltmVErdEo");


router.post("/", async (req, res) => {
    try {    
        let d = new Date(req.body.date_visit);
        const new_visit = new Visit({
            user_id: req.body.user_id,
            doctor_id: req.body.doctor_id,
            symptoms: req.body.symptoms,
            date_visit: d,
            predicted_diseases: req.body.disease,
        })
        new_visit.save((err, saved) => {
        if (err){
            console.log(err)
        }});
        
        let dt = getFormattedDate(d);

        MedBot.telegram.sendMessage(req.body.user_id, `Вы записались на ${dt}\nЕсли у Вас какие либы аллергии или хронические болезни или что ли бы что доктору важно знать?`);
        let patient = await Patient.findOne({chat_id: req.body.user_id})
        patient.all_ok = 2
        patient.save()
        res.sendStatus(200);
    } catch (error) {
      res.send(error);
    }
});


module.exports = router