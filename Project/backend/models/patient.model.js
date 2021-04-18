const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    
    firstName:{
        type:String,
        required:true,
        // unique:true,
        // trim:true,
    },
    lastName:{
        type:String,
        required:true,
        // unique:true,
        // trim:true,
    },
    phoneNumber:{
        type:String,
        required:true,
        // unique:true,
        // trim:true,
    },
    sex:{
        type:String,
        required:true,
    },
    age:{
        type:Number, 
        required:true,
        // unique:true,
        // trim:true,
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
    }
},{timestamps:true,
})

const Patient = mongoose.model('patient',patientSchema);

module.exports = Patient;