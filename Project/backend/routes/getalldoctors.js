const router = require('express').Router();
let Doctor = require('../models/doctor.model');
let Spec = require('../models/specialization.model');



router.get("/", async (req, res) => {
    try {
        console.log("fuck")
        // let spec = await Spec.find({});
        
        let result = [];
        // let spec_name;
        // for (var i = 0; i < spec.length; i++) {
        //     let docs = await Doctor.find({specialization_ids: spec[i].id});
            
        //     spec_name = spec[i].name + "";
        //     result.push({spec_name:docs});
        // }
        let docs = await Doctor.find({});
        for (var i = 0; i < docs.length; i++) {
            var spec_db = [];
            console.log(docs[i])
            for(let j = 0; j<docs[i].specialization_ids.length; j++){
                s = await Spec.findOne({id: docs[i].specialization_ids[j]});
                spec_db.push(s.name)
            } 
            result.push({id: docs[i].id, name: docs[i].name, surname: docs[i].surname, spec: spec_db});
        }
        res.send(result);

      } catch (error) {
        res.send(error);
      }
})


module.exports = router