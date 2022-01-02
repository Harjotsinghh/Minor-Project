const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const schema = new Schema({
    teachers :[{
        isAvailable : Boolean,
        intime : Date,
        outtime : Date,
        name : String
    }],
    name : String
});

module.exports = mongoose.model('college',schema);
