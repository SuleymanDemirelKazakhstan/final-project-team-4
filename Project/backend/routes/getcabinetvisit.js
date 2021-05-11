const router = require('express').Router();
let Visit = require('../models/visit.model');



router.get("/", async (req, res) => {
    try {

      var start = new Date();
      start.setHours(6,0,0,0);
    
      var end = new Date();
      end.setHours(29,59,59,999);

      let today_visit_conf = await Visit.find({date_visit: {$gte: start, $lt: end} , doctor_id: parseInt(req.query.doctor) , status: "confirmed"})
      let today_visit_done = await Visit.find({date_visit: {$gte: start, $lt: end} , doctor_id: parseInt(req.query.doctor) , status: "done"})
      let visit_not_conf = await Visit.find({doctor_id: parseInt(req.query.doctor) , status: "not confirmed"})

      res.send({today_visit_conf:today_visit_conf , today_visit_done:today_visit_done , visit_not_conf:visit_not_conf});
    } catch (error) {
      res.send(error);
    }
});


module.exports = router