const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    questiontxt : String, 
    questionimg : String,
    repjuste : String,
    repfausse1 : String, 
    repfausse2 : String, 
    repfausse3 : String,
    repphoto : String, 
    info : String, 
    info2 : String, 
    type : Boolean
    });


module.exports = mongoose.model('Quiz', quizSchema); 