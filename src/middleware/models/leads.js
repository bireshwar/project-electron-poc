const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const leads =  new Schema({
    userid:{
        type: String,
        required: true
    }
})
module.exports = leads;

