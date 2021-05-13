module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                productName: "WosnicApp",
                extraFiles: [{
                    "from": "node_modules/mysides",
                    "to": "Resources",
                    "filter": [
                        "**/*"
                    ]
                }]
            },
            externals: ['chokidar','socket.io'],
            // If you are using Yarn Workspaces, you may have multiple node_modules folders
            // List them all here so that VCP Electron Builder can find them
            nodeModulesPath: ['../../node_modules', './node_modules']
        },
    },
};