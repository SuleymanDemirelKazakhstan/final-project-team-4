const router = require('express').Router();
let Visit = require('../models/visit.model');
const { Telegraf } = require("telegraf");
const {getFormattedDate} = require("../controllers/dateformat")

let MedBot = new Telegraf("1660503992:AAFS8OT8RFktrRB9byz5i6LhFZltmVErdEo");


router.post("/", async (req, res) => {
    try {    
        let visit = await Visit.findOne({user_id: req.body.user_id , doctor_id: req.body.doctor_id, status: "not confirmed"})
        
        visit.doctor_id = req.body.new_doctor_id
        await visit.save();

        res.sendStatus(200);
    } catch (error) {
      res.send(error);
    }
});


module.exports = router