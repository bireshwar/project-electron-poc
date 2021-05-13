const elasticSearch = require('elasticsearch');
const config        = require('../config/config');

let elastic = {
    connect  : () => {
        return new elasticSearch.Client({
            hosts: [config[config["FLAG"]].elasticsearch.url]
        })
    }
}

module.exports = elastic;