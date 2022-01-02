const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const  schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email : {
        type:String,
        required: true
    },
    password: {
        type: String,
        required:true
    },
    college: {
        type:String,
        required:true
    },
    collegeid :{
        type:Schema.Types.ObjectId,
        ref:'college',
        required:true,
    }
});

module.exports = mongoose.model('user',schema);

