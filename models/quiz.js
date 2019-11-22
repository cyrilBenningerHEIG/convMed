const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    questiontxt : String, 
    questionimg : String,
    repjuste : String,
    answers : Array,
    repphoto : String, 
    info : String, 
    info2 : String, 
    type : Boolean
    });


module.exports = mongoose.model('Quiz', quizSchema); 