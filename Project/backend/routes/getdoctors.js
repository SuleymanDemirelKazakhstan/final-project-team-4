const router = require('express').Router();
const url = require('url');
let Doctor = require('../models/doctor.model');
let Spec = require('../models/specialization.model');
let Patient = require('../models/patient.model');


router.get("/", async (req, res) => {
    try {
        let doctor = await Doctor.findOne({id:parseInt(req.query.doctor)})
        let patient = await Patient.findOne({chat_id:parseInt(req.query.user)})
        let spec = []

        for (var i = 0; i < doctor.specialization_ids.length; i++) {
          let s = await Spec.find({id: parseInt(doctor.specialization_ids[i])});
          spec.push(s);
        }

        res.send({doctor:doctor,spec:spec, user: patient});
      } catch (error) {
        console.log('err')
        res.send(error);
      }
})













// router.route('/').get((req,res)=>{
//     Doctor.find({ parent: /^\/$/}, function (err, docs) {
//         res.json(docs)
//         })
// })

// router.route('/*').get((req,res)=>{
//     var path = url.parse(req.url).pathname;
//     path = path.slice(1);
//     specialization = path.split('/')[0];
//     id = path.split('/')[1];
//     let doc;
//     if(path.split('/').length == 1){
//         Doctor.find({ specialization_ids: new RegExp('^/' + specialization+'$' )}, function (err, docs) {
//         res.json(docs)
//         })
//     }
//     if(path.split('/').length == 2){
//         // Doctor.findOne({ id: id}, function (err, docs) {
//         // res.json(docs)
//         // console.log(docs)
//         // })
//         Doctor.findOne(function (err, docs) {
//         res.json(docs)
//         console.log(docs)
//         })
//     }
// })

// router.route('/addDoctor').post((req,res)=>{
//     const name = req.body.name;
//     const category = req.body.category;
//     const parent = req.body.parent
//     const newDoctor = new Doctor({name,parent,category})
//             newDoctor.save()
//             .then(()=>res.json('doctor added'))
//             .catch(err=>res.status(400).json('Error '+err))
// })

module.exports = router