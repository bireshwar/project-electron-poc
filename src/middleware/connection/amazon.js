const aws    = require('aws-sdk');
const config = require('../config/config');

let amazon = {
    source  : ( type ) => {
        let object = {};
        if( type == "aws" ){
            object = {
                security : {
                    accessKeyId : config[config["FLAG"]].amazon.accessKeyId,
                    secretAccessKey : config[config["FLAG"]].amazon.secretAccessKey
                },
                metadata : {
                    region : config[config["FLAG"]].amazon.region
                }
            };
        } else {
            object = {
                security : {
                    clientID          : config[config["FLAG"]].amazon.clientID,
                    clientSecret      : config[config["FLAG"]].amazon.clientSecret,
                    callbackURL       : config[config["FLAG"]].amazon.callbackURL,
                    passReqToCallback : config[config["FLAG"]].amazon.passReqToCallback
                },
                metadata : {}
            }
        }
        return object;
    },

    connect : ( type ) => {
        aws.config.update(amazon.source(type).security);
    },

    s3 : ( type ) => {
        return new aws.S3();
    },

    setGlobalConfig : ( type ) => {
        aws.config.region = amazon.source(type).metadata.region;
    },

    init : ( type ) => {
        amazon.setGlobalConfig( type );
    }
}

module.exports = amazon;