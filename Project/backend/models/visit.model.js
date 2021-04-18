const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitSchema = new Schema({
    user_id:{
        type:Number,
        required:true,
        unique:true,
        trim:true
    },
    doctor__id:{
        type:Number,
        required:true,
        unique:true,
        trim:true
    },
    date:{
        type:Date,
        required:true,
        unique:true,
        trim:true
    },
    symptoms:{ type : Array , "default" : [] },
    predicted_diseases:{ type : Array , "default" : [] },
    list_of_analysis:{ type : Array , "default" : [] },
    comment_befor_visit:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    recept:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    comment_after_visit:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    status:{
        type:String,
        required:true,
        unique:true,
        trim:true
    }

},{timestamps:true,
})

const Visit = mongoose.model('Visit',visitSchema);

module.exports = Visit;