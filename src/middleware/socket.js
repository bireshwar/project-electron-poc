let sock    = require("socket.io");
let server  = require("./server");
let eventEmitter = require("./event");
let io = ( port, path, execPath, app, win, type ) => {
    const io = sock( server.serve( port, path, execPath ) );
    io.on( "connection", ( socket ) => {
        eventEmitter.on( "file-added", function ( file ) {
            socket.emit( "file-added", file )
        });
        eventEmitter.on( "file-changed", function ( file ) {
            socket.emit( "file-changed", file )
        });
        eventEmitter.on( "file-removed", function ( file ) {
            socket.emit( "file-removed", file )
        });
    });

    return io;
}

module.exports = {
    io : io
}