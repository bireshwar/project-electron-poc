let events = require("events");
const eventEmitter  = new events.EventEmitter();
eventEmitter.setMaxListeners(100);
module.exports = eventEmitter;