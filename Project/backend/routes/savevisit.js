const router = require('express').Router();
let Visit = require('../models/visit.model');
const { Telegraf } = require("telegraf");
const {getFormattedDate} = require("../controllers/dateformat")

let MedBot = new Telegraf("1660503992:AAFS8OT8RFktrRB9byz5i6LhFZltmVErdEo");


router.post("/", async (req, res) => {
    try {    
        // console.log(req)
        const new_visit = new Visit({
            user_id: req.body.user_id,
            doctor_id: req.body.doctor_id,
            symptoms: req.body.symptoms,
            date_visit: Date.parse(req.body.date_visit),
            predicted_diseases: req.body.disease,
        })
        new_visit.save((err, saved) => {
        if (err){
            console.log(err)
        }});
        
        let dt = getFormattedDate(Date.parse(req.body.date_visit));
        // let dt = new Date(req.body.date_visit);
        MedBot.telegram.sendMessage(req.body.user_id, `Вы записались на ${dt}`);

        res.sendStatus(200);
    } catch (error) {
      res.send(error);
    }
});


module.exports = router