const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SnipSchema=new Schema({
    name:{
        type:String
    },
    country:{
        type:String
    },
    idsnippet:{
        type:String
    }
})

module.exports = SnipSchema;