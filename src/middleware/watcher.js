let chokidar     = require("chokidar");
let eventEmitter = require("./event");

let watch = ( path, app, win ) => {
    chokidar
        .watch( path, {
            ignored: /[\/\\]\./,
            persistent: true
        })
        .on("add", ( file ) => {
            console.log( win );
            win.show();
            eventEmitter.emit( "file-added", file );
        })
        .on("change", ( file ) => {
            win.show();
            eventEmitter.emit( "file-changed", file );
        })
        .on("unlink", ( file ) => {
            win.show();
            eventEmitter.emit( "file-removed", file );
        })
    return chokidar;
}

module.exports = {
    watch : watch
};