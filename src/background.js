"use strict";
let watcher = require("./middleware/watcher");
let socket  = require("./middleware/socket");
import paths from 'path';
import { app, Menu, protocol, BrowserWindow, globalShortcut, remote } from "electron";
import {
    createProtocol, 
    installVueDevtools 
} from "vue-cli-plugin-electron-builder/lib";
let port    = 7000;
let baseUrl = "localhost";
let path    = `${app.getPath("home")}/WOSNIC`;
const debug = /--debug/.test(process.argv[2])
const root = process.cwd();
//const { isPackaged, getAppPath } = remote.app;
const isDevelopment = process.env.NODE_ENV !== "production";

const binariesPath = !isDevelopment ? paths.join(paths.dirname(app.getAppPath()), '..', './Resources') : paths.join(paths.dirname(app.getAppPath()), 'dist_electron');

const execPath = paths.resolve(paths.join(binariesPath, './mysides'));

let win;

protocol.registerSchemesAsPrivileged([{
    scheme: "app",
    privileges: {
        secure: true,
        standard: true
    }
}]);

if (isDevelopment) {
    if (process.platform === "win32") {
        process.on("message", (data) => {
            if (data === "graceful-exit") {
                app.quit();
            }
        });
    } else {
        process.on("SIGTERM", () => {
            app.quit();
        });
    }
}

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    console.log("a");
    if (win === null) {
        createWindow( "activate" );
    }
});

app.on("ready", async() => {
    if (isDevelopment && !process.env.IS_TEST) {
        globalShortcut.register("CommandOrControl+R", () => {
            console.log("CommandOrControl+R is pressed: Shortcut Disabled");
        });        
        const dockMenu = Menu.buildFromTemplate([{
            label: "New Window",
            click() {
                console.log("New Window");
            }
        }, {
            label: "New Window with Settings",
            submenu: [{
                label: "Basic",
            }, {
                label: "Pro",
            }]
        }, {
            label: "New Command..."
        }]);

        app.dock.setMenu(dockMenu);
        try {
            //await installVueDevtools();
        } catch (e) {
            console.error("Vue Devtools failed to install:", e.toString());
        }
    }
    createWindow( "ready" );
});

function createWindow( type ) {
    win = new BrowserWindow({
        width: 400,
        height: 700,
        resizable: false,    
        maximizable: false,
        title: "Wosnic App",
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION
        },
    });
    win.on("page-title-updated", (event) => event.preventDefault());
    watcher.watch( path, app, win );
    if( type == "ready" ){
        socket.io( port, path, execPath, app, win );
    }

    if ( process.env.WEBPACK_DEV_SERVER_URL) {
        ///win.loadURL(`http://${baseUrl}:${port}/`);
        win.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}`);
    } else {
        createProtocol("app");
        win.loadURL("app://./index.html");
    }

    win.on("closed", () => {
        win = null;
    });
}