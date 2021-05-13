const config = require('../config/config');

let facebook = {
    source  : () => {
        return config[config["FLAG"]].facebook;
    }
}

module.exports = facebook;