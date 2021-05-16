const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diseaseSchema = new Schema({
    name_en:{
        type:String,
    },
    name_ru:{
        type:String,
    },
    specialization_ids: { type : Array , "default" : [] },
    frequency:{
        type:Number
    }
},{timestamps:true,
})

const Disease = mongoose.model('Disease',diseaseSchema, "disease");

module.exports = Disease;