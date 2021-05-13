const fs         = require('fs');
const path       = require('path');
const express    = require('express');
const bcrypt     = require('bcrypt');
const jwt        = require('jsonwebtoken');
const htmlToText = require('html-to-text');
const dateFormat = require('dateformat');
const empty      = require('is-empty');
const { exec }   = require("child_process");
const auth       = require('./config/auth');
const router     = express.Router();
const alert      = require('alert');


let getExtension = ( filename ) => {
    var ext = path.extname( filename || '' ).split('.');
    return ext[ ext.length - 1 ];
}

let createFolder = ( path, execPath ) => {
  if (!fs.existsSync(path)){
    fs.mkdirSync(path);
    addToFavourites( path, execPath );
  } else {
    addToFavourites( path, execPath );
    fs.readdir( path, ( err, files ) => {
      for ( const file of files ) {
        fs.unlink(`${path}/${file}`, (err) => {
          if (err) {
            console.error(err)
          }
        });
      }
    });
  }
};

let addToFavourites = ( path, execPath ) => {
  exec(`${execPath} add 'WOSNIC' 'file://${path}'`, (error, stdout, stderr) => {
      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`stdout: ${stdout}`);
  });

}

let route = ( app, folderPath, execPath, passport, source , mongo, elastic, mysql, amazon, facebook ) => {
    auth.normalAuth( source.models.utenti, passport );
    auth.amazonAuth( source.models.utenti, passport, amazon );
    auth.facebookAuth( source.models.utenti, passport, facebook );

    createFolder( folderPath, execPath );

    /** Login with Email Id & Password **/
    app.post('/api/login', ( req, res, next ) => {
        source.models.utenti.findOne({
            email: req.body.email
        }).then(user => {
            if (!user) {
                return res.status(404).json({
                    msg: "Username is not found.",
                    success: false
                });
            }

            bcrypt.compare(req.body.password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = {
                      _id: user._id,
                      email: user.email
                    }
                    jwt.sign(payload, "secret", {
                        expiresIn: 604800
                    }, (err, token) => {
                      let country = user.country == "Italy" ? user.country : "United States";
                      source
                        .models
                          .languages
                            .findOne({country:country})
                              .then(valueLang=>{
                                res.status(200).json({
                                    success: true,
                                    token: `Bearer ${token}`,
                                    user: user,
                                    lang : valueLang,
                                    msg: "Hurry! You are now logged in."
                                });
                              });
                    })
                } else {
                    return res.status(404).json({
                        msg: "Incorrect password.",
                        success: false
                    });
                }
            })
        });
    });

    /** Login with Amazon **/
    app.get('/api/login/amazon', passport.authenticate('amazon', { scope: ['profile'] }));

    /** Login Callback with Amazon **/
    app.get('/auth/amazon/callback', passport.authenticate('amazon', { scope: ['profile'] }), async ( req, res, next ) => {
      console.log( req );
      if (mongo.mongoose.Types.ObjectId.isValid(req.user._id)) {
        await source
          .models
            .utenti
              .findById(req.user._id, ( (err, data) => {
                res.redirect('http://localhost:8081/dashboard');
              }));
      } else {
        console.log("Reload the function")
      }
    });

    /** Login with Facebook **/
    app.get('/api/login/facebook', passport.authenticate('facebook', { scope: ['email'] }));

    /** Login Callback with Facebook **/
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { scope: ['email'] }), async (req, res, next ) => {
      console.log( req.user);
      if (mongo.mongoose.Types.ObjectId.isValid(req.user._id)) {
        await source
          .models
            .utenti
              .findById(req.user._id, (function (err, data) {
                res.redirect('http://localhost:8081/dashboard');
              }))
      } else {
        console.log("Reload the function")
      }
    });

    /** Profile  **/
    app.get('/api/profile', passport.authenticate('jwt', {
        session: false
    }), (req, res) => {
        let country = req.user.country == "Italy" ? req.user.country : "United States";
        source
          .models
            .languages
              .findOne({country:country})
                .then(valueLang=>{
                  res.status(200).json({
                    user : req.user,
                    lang : valueLang
                  })
                });
    });

    /** Group **/
    app.post('/api/groups', ( req, res, next ) => {
        console.log( req.id );
        source
            .models
                .gruppi
                    .find({ uGroup: req.body.id, "delete": 'false' })
                        .then(mygroup => {
                            res.status(200).json(mygroup);
                        }).catch(err => {
                            console.log(err)
                            res.status(200).json([]);
                        });     
    });

    /** Add Snippet **/
    app.post('/api/snippet/add', ( req, res, next ) => {
        var now        = new Date();
        var dataForm   = String(dateFormat(now, "dddd,mmmm dS, yyyy")); //"dddd, mmmm dS, yyyy, h:MM:ss TT"
        var title      = empty(req.body.title);
        var content    = empty(req.body.content)
        content        = htmlToText.fromString(content);

        if (title === true & content == true) {
            alert("Il campo titolo e contenuto sono obbligatori")
        } else {
            source
                .models
                    .utenti
                        .findOne({ _id: req.body.user._id })
                            .then(obj => {
                                var nomeUt = obj.nome;
                                var cognomeUt = obj.cognome;
                                const imageAccount1 = (obj.image).toString();
                                var groupId = req.body.groupId;
                                source
                                    .models
                                        .gruppi
                                            .findOne({ _id: groupId })
                                                .then(nota => {
                                                    var arrayUser = nota.uGroup;
                                                    elastic.index({
                                                        index: "null",
                                                        body: {
                                                            "name": String(req.body.name),
                                                            "surname": String(req.body.surname),
                                                            "imageAccount": imageAccount1,
                                                            "dateToDay": dataForm,
                                                            "userid": arrayUser, //ho tolto le quadre
                                                            "useridPadre": String(req.body.user._id),
                                                            "title": String(req.body.title),
                                                            "content": String(req.body.content),
                                                            "show": false,
                                                            "idGruppo": req.body.groupId,
                                                            "groupName": nota.nomeGruppo,
                                                            "nome": String(nomeUt),
                                                            "cognome": String(cognomeUt),
                                                            "publicationState": req.body.status,
                                                            "userPadreGruppo": nota.userid,
                                                            "imageGroup": nota.imageGroup,
                                                            "descriptionFile": "",
                                                            "snippetURL": "https://www.wosnic.com/" + req.body.title,
                                                            "countF": 0
                                                        }
                                                    }, function (err, resp, status) {
                                                        if (req.body.status == "public") {
                                                          source
                                                              .models
                                                                  .utenti
                                                                      .findOne({ _id: req.body.user._id })
                                                                          .then(uPublic => {
                                                                              const dnm = new source.models.snip({
                                                                                  name: req.body.title,
                                                                                  country: uPublic.country,
                                                                                  idsnippet: resp._id
                                                                              })
                                                                              dnm.save()
                                                                          })
                                                        }
                                                        var countSni = obj.countSnippets + 1;
                                                        obj.countSnippets = countSni;
                                                        obj.save();
                                                      res.status(200).json(resp);
                                                    });
                                                });
                            });
        }
    });

    /** Search Snippet **/
    app.post('/api/snippet/search', (req, res, next) => {
        if (!req.body.user) {
            res.status(403).send({ "error": "You do not have rights to visit this page" });
        } else {
            let body = {
              from: 0,
              size: 15,
              query: {
                bool: {
                  must: [{
                      "bool": {
                        "should": [
                          { "match": { title: req.body['q'] } },
                          { "match": { content: req.body['q'] } },
                          { "match": { nome: req.body['q'] } },
                          { "match": { cognome: req.body['q'] } },
                          { "match": { dateToDay: req.body['q'] } },
                          { "match": { groupName: req.body['q'] } }
                        ]
                      }
                    },
                    {
                      "bool": {
                        "must": [
                          { "match": { userid: req.body.user._id } }
                        ]
                      }
                    }
                  ]
                }
              }
            }

            elastic.search({ body: body })
              .then(results => {
                function listAttachments(itemId) {
                  return new Promise(function (resolve, reject) {
                    let getAttachedFiles = 'SELECT COUNT(*) as fileCount from `files` WHERE `idSnippet` = "' + itemId + '"';
                    mysql.query(getAttachedFiles, (err, resultFiles) => {
                      if (err) {
                        return reject(err);
                      }
                      resolve(resultFiles);
                    });
                  });
                }
                var PromiseHits = results.hits.hits.map(item => {
                  return listAttachments(item._id).then(function (results) {
                    item.files = results;
                    item.isDisabled = false;
                    item.loading = false;
                    item.seen = false;
                    return item
                  })
                });
                Promise.all(PromiseHits).then(function (resultWithFiles) {
                  res.status(200).json(resultWithFiles);
                })
              })
              .catch(err => {
                res.status(500).json(err);
              });
         }
    });

    /** Upload Files **/
    app.post('/api/files/upload/:id', ( req, res ) => {
        amazon.connect("aws");
        let body = {
          size: 100,
          from: 0,
          query: {
            bool: {
              must: [{
                  "bool": {
                    "must": [
                      { "match": { _id: req.params.id } }
                    ]
                  }
              }]
            }
          }
        };

        elastic.search({ body: body })
          .then(results => {
            let allData = {};
            allData.hit = results.hits.hits[0];
            source
              .models
                .gruppi
                  .findOne({_id: allData.hit._source.idGruppo})
                    .then(valuePromise => {
                      if (valuePromise.groupType == 'Base') {
                        allData.typeGroup    = 'Base';
                        allData.useridPay    = req.body.user._id;
                        allData.useridUnique = req.body.user._id;
                      } else {
                        allData.typeGroup    = 'Enterprise';
                        allData.useridPay    = valuePromise.userid;
                        allData.useridUnique = valuePromise.userid;
                      }

                      if (req.body.user) {
                        if ( req.params.id ) {
                            if ( req.body.file == "" || req.body.file == null ) {
                                res.status(400).send("No files were uploaded.");
                            } else {
                              allData.userID       = req.body.user._id;
                              allData.idSnippet    = req.params.id;
                              allData.useriIdGroup = valuePromise.userid;
                              allData.idGroup      = valuePromise._id;
                              allData.file         = req.body.file;
                              source
                                .models
                                  .utenti
                                    .findOne({ _id: allData.useridUnique })
                                      .then(dati3 => {
                                          allData.dati3 = dati3;
                                          allData.countS = dati3.countSize;
                                          if (allData.countS < 5000) {
                                            if( allData.file ){
                                              allData.s3    = amazon.s3();
                                              singleUploadNSave( allData, allData.file, function( err, res1, res2 ){
                                                if (err) {
                                                  res.status(500).json({error:err});
                                                } else {
                                                    res.status(200).json({result:{
                                                      file : res1,
                                                      metadata : res2
                                                    }});
                                                }
                                              });

                                              function singleUploadNSave( allData, file, cb ){
                                                let fileSize = fs.statSync(file.path)["size"] / 1000000.0;

                                                let params = {
                                                  Bucket: 'wiepk',
                                                  Tagging: encodeURI('userID=' + allData.userID + '&idSnippet=' + allData.idSnippet + '&useriIdGroup=' + allData.useriIdGroup + '&idGroup=' + allData.idGroup + '&typeGroup=' + allData.typeGroup + '&useridPay=' + allData.useridPay + '&descriptionFile=' + file.description + '&fileExtension=' + file.type),
                                                  Body: fs.createReadStream(file.path),
                                                  Key: allData.userID + "/" + path.basename(file.path)
                                                };

                                                allData
                                                  .s3
                                                    .upload(params, function(err, data){
                                                        if(err) {
                                                          console.log( encodeURI('userID=' + allData.userID + '&idSnippet=' + allData.idSnippet + '&useriIdGroup=' + allData.useriIdGroup + '&idGroup=' + allData.idGroup + '&typeGroup=' + allData.typeGroup + '&useridPay=' + allData.useridPay + '&descriptionFile=' + file.description + '&fileExtension=' + file.type) );
                                                          console.log(err);
                                                          cb(err);
                                                        } else {
                                                          let query = "INSERT INTO `files` (userID, idSnippet, useriIdGroup,idGroup, typeGroup, useridPay, image, size, descriptionFile,fileExtension) VALUES ('" +
                                                          allData.userID + "', '" + allData.idSnippet + "', '" + allData.useriIdGroup + "', '" + allData.idGroup + "', '" + allData.typeGroup + "', '" + allData.useridPay + "', '" + file.name + "', '" + fileSize + "', '" + file.description + "','" + file.type + "')";
                                                          mysql.query(query, (err, result) => {
                                                              if (err) {
                                                                cb(err);
                                                              } else {
                                                                
                                                                fs.unlink(`${file.path}`, (err) => {
                                                                  if (err) {
                                                                    cb(err);
                                                                  } else {
                                                                    cb( null, data, result);
                                                                  }
                                                                });
                                                                
                                                              }
                                                          });
                                                        }
                                                    })
                                                    // .on('httpUploadProgress', function(evt) { 
                                                    //   console.log(evt); 
                                                    //   //Emit Here your events 
                                                    // })
                                              

                                                //allData.dati3.countSize = allData.countS + fileSize
                                                //allData.dati3.save();
                                              }
                                            }
                                          }
                                      });
                            }
                        }
                      }
                    }).catch();
          });
    });

    /** Get Files **/
    app.get('/api/files', ( req, res ) => {
        let allFiles = [];
        fs.readdir( folderPath, ( err, files ) => {
            files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
            for ( const file of files ) {
                if( getExtension( file ) ){
                    allFiles.push({
                      name : file,
                      type : getExtension( file ),
                      description : file,
                      path : `${folderPath}/${file}`
                      //content :fs.readFileSync(`${folderPath}/${file}`)
                  });
                }
            }

            res.json( allFiles );
        });
    });

    /** Delete File **/
    app.post('/api/file/delete', ( req, res ) => {
      fs.unlink(`${folderPath}/${req.body.name}`, (err) => {
        if (err) {
          console.error(err)
          return;
        }
        res.status(200).json({message:"File Removed!!"});
      });
    });

    // app.post('/api/languages', function (req, res) {
    //   source
    //     .models
    //       .utenti
    //         .findOne({ _id: req.body.user.id })
    //           .then(requestCountry=>{
    //             if(requestCountry.country == "Italy"){
    //               source
    //                 .models
    //                   .languages
    //                     .findOne({country:"Italy"})
    //                       .then(valueLang=>{
    //                         res.status(200).json(valueLang)
    //                       })
    //             } else{
    //               source
    //                 .models
    //                   .languages
    //                     .findOne({country:"United States"})
    //                       .then(valueLang=>{
    //                         res.status(200).json(valueLang)
    //                       })
    //             }
    //           })
    // });

    return app;
}

module.exports = {
    route : route
};