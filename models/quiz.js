const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    question_txt : String, 
    question_img : String,
    rep_juste : String,
    rep_fausse1 : String, 
    rep_fausse2 : String, 
    rep_fausse3 : String, 
    info : String, 
    info2 : String, 
    type : Boolean
    });


module.exports = mongoose.model('Quiz', quizSchema); 