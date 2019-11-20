const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const integerValidator = require('mongoose-integer');
const ObjectId = mongoose.Types.ObjectId;

const questionSchema = new Schema({
    num : Integer, 
    right_response : ObjectId, 
    fasle_response : ObjectId,
    fasle_response2 : ObjectId, 
    fasle_response3 : ObjectId, 
    type : Boolean
    });

router.post('/', function(req, res, next) {

});

module.exports = mongoose.model('Question', questionSchema);