const mongoose = require('mongoose');
const config   = require('../config/config');

let models = [{
    name : "utenti"
},{
    name : "gruppi"
},{
    name : "snip"
},{
    name : "enterprise"
},{
    name : "jnodes"
},{
    name : "leads"
},{
    name : "languages"
},{
    name : "wlink"
}];

let mongo = {
    mongoose : mongoose,

    connect  : () => {
        mongoose.Promise = global.Promise;
        return mongoose.connect(config[config["FLAG"]].mongo.url, {
            useUnifiedTopology : true,
            useNewUrlParser: true,
        })
    },

    include : ( model ) => {
        return require(`../models/${model}`);
    },

    get : ( model ) => {
        return mongoose.model( model );
    },

    set : ( model ) => {
        mongoose.model( model, mongo.include( model ) );
    },

    setAll : () => {
        for ( let i = 0; i < models.length; i++ ){
            mongo.set( models[i].name )
            models[i].value = mongo.get( models[i].name );
        }
    },

    getAll : () => {
        return models;
    }
}

module.exports = mongo;