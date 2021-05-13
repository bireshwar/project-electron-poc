const AmazonStrategy   = require('passport-amazon').Strategy
const FacebookStrategy = require('passport-facebook');
const JwtStrategy      = require('passport-jwt').Strategy;
const ExtractJwt       = require('passport-jwt').ExtractJwt;
const secret           = require('./config').SECRET;

const opts = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey    : secret
};

let normalAuth = ( User, passport ) => {
  passport.use(
      new JwtStrategy(opts, (jwt_payload, done) => {
          User.findById(jwt_payload._id).then(user => {
              if (user) return done(null, user);
              return done(null, false);
          }).catch(err => console.log(err));
      })
  );
};


let amazonAuth = ( User, passport, amazon ) => {
    passport.use(new AmazonStrategy(amazon.source("amazon").security, function (req, accesstoken, refreshToken, profile, done) {
        let data = profile._json;
        const me = new User({
          nome: data["name"],
          cognome: data["name"],
          email: data["email"],
          password : "",
          emailCommunications: data["email"],
          image: "https://wosnic.s3.eu-central-1.amazonaws.com/folder/account.jpg",
          enterpriseGroup: 0,
          sizeAvailable: 500,
          snippetAvailable: 250
        });
        User.findOne({ email: me.email }, function (err, u) {
          if (!u) {
            me.save(function (err, me) {
              if (err) return done(err);
              User.findOne({ email: me.email }, function (err, data) {
                console.log("iddd", data._id.toString())
                return done(null, data );
              })
            });
          } else {
            done(null, u);
          }
        });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
};

let facebookAuth = ( User, passport, facebook ) => {
  passport.use('facebook', new FacebookStrategy(facebook.source(), function (req, res, token, refreshToken, profile, done) {
      var data = profile._json;
      const me = new User({
        nome: data["first_name"],
        cognome: data["last_name"],
        email: data["email"],
        emailCommunications: data["email"],
        fbid: data["id"],
        image: "https://wosnic.s3.eu-central-1.amazonaws.com/folder/account.jpg",
        enterpriseGroup: 0,
        sizeAvailable: 500, //MEGABYTE
        snippetAvailable: 250
      });
  
      User.findOne({ email: me.email }, function (err, u) {
        if (!u) {
          me.save(function (err, me) {
            if (err) return done(err);
            User.findOne({ email: me.email }, function (err, data) {
              console.log("iddd", data._id.toString())
              return done(null, data);
            })
          });
        } else {
          done(null, u);
        }
      });
  }));
};

module.exports = {
    amazonAuth   : amazonAuth,
    normalAuth   : normalAuth,
    facebookAuth : facebookAuth
};