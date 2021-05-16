const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    
    chat_id:{
        type:Number,
        required:true,
    },
    firstName:{
        type:String,
        // required:true,
    },
    lastName:{
        type:String,
        // required:true,
    },
    patronymic:{
        type:String,
    },
    phoneNumber:{
        type:String,
    },
    sex:{
        type:String,
    },
    age:{
        type:Number, 
    },
    blood_type:{
        type:Number, 
        // required:true,
        // unique:true,
        // trim:true,
    },
    allergy:{
        type:String, 
        // required:true,
        // unique:true,
        // trim:true,
    },
    all_ok:{
        type: Number, 
        default: 0
    },
    check_name:{
        type: Number, 
        default: 0
    },
    symptoms: { type : Array , "default" : [] }
},{timestamps:true,
})

const Patient = mongoose.model('patient',patientSchema);

module.exports = Patient;