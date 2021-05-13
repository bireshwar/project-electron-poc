const express       = require("express");
const flash         = require('connect-flash');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const session       = require('express-session');
const passport      = require('passport');
const router        = require("./routes");
const mongo         = require('./connection/mongodb');
const elasticsearch = require('./connection/elasticsearch');
const mysql         = require('./connection/mysql');
const amazon        = require('./connection/amazon');
const facebook      = require('./connection/facebook');
const app           = express();

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );
app.use( cors() );
app.use(session({ 
    secret: 'secret',
    resave: false,
    saveUninitialized: false 
}));
app.use(express.static(`../public`));

app.use(flash());
app.use((req, res, next) => {
  res.locals.msg_successo = req.flash('msg_successo');
  res.locals.msg_errore = req.flash('msg_errore');
  res.locals.error = req.flash('error');
  res.locals.user = req.user;
  next();
});
app.use(passport.initialize());
app.use(passport.session());

let server = {
    serve : ( port, path, execPath, electronApp, win, type ) => {
        return app.listen( port, () => {
            console.log( `Server is listening.. PORT : ${port}`);
            mongo.setAll();
            mongo
                .connect()
                    .then(( dataSource ) => {
                        let elastic = elasticsearch.connect();
                        elastic.ping({
                            requestTimeout: 30000,
                        }, (error)  => {
                            if (!error) {
                                mysql
                                    .getConnection((err) => {
                                        if (err) {
                                            throw err;
                                        } else {
                                            amazon.init("aws");
                                            router.route( app,
                                                            path,
                                                            execPath,
                                                            passport,
                                                            dataSource,
                                                            mongo,
                                                            elastic,
                                                            mysql,
                                                            amazon,
                                                            facebook );
                                        }
                                    });
                            } else {
                                console.log("Elastic search connection failed!");
                            }
                        });
                    })
                    .catch(err => console.log(err));
        });
        
    }
}

module.exports = server;