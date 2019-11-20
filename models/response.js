const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const integerValidator = require('mongoose-integer');
const ObjectId = mongoose.Types.ObjectId;

const responseSchema = new Schema({
    nom : String, 
    photo_question : String, 
    photo_response : String,
    text_question : String, 
    info : String, 
    src : String
    });

module.exports = mongoose.model('Response', responseSchema); 