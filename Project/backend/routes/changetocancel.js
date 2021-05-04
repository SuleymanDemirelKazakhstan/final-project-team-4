const router = require('express').Router();
let Visit = require('../models/visit.model');
const { Telegraf } = require("telegraf");


let MedBot = new Telegraf("1660503992:AAFS8OT8RFktrRB9byz5i6LhFZltmVErdEo");


router.post("/", async (req, res) => {
    try {
      console.log(req.body.user_id)

      var start = new Date();
      start.setHours(0,0,0,0);
      
      var end = new Date();
      end.setHours(23,59,59,999);

      let visit = await Visit.findOne({date_visit: {$gte: start, $lt: end} , user_id: req.body.user_id , doctor_id: req.body.doctor_id , status: "confirmed"})
      visit.status = "cancel"
      await visit.save();
      MedBot.telegram.sendMessage(req.user_id, 'По причине того что Вы не пришли визит был отменен.');
      
      res.sendStatus(200);
    } catch (error) {
      res.send(error);
    }
});


module.exports = router
