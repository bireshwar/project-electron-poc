const mongoose = require('mongoose');

const snippetsSchema = mongoose.Schema({
    titolo:{
        type: String,
        required: true
    },
    contenuto:{
        type: String,
        required: true
    },
    utente:{
        type: String,
        required: true
    },
    data:{
        type: Date,
        default: Date.now
    }
});
module.exports = snippetsSchema;