const passport = require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// telk passport to use a new strategy for google log in
passport.use(new googleStrategy({
    clientID: "876758467184-mosg34svp77ffibdpgji43g4p2fi7ute.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"},

    function(accessToken, refreshToken, profile, done){
        // find a user
        // User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        //     if(err){console.log('error in google strategy-passport',err); return;}

        //     if(user){
        //         // if found, set this user as req.user
        //         return done(null, user);
        //     }else{
        //         // if not found, create the user and set it as req.user
        //        User.create({
        //         name: profile.displayName,
        //         email: profile.emails[0].value,
        //         password: crypto.randomBytes[20].toString('hex')
        //        }, function(err, user){
        //         if(err){console.log('error in google strategy-passport', err); return;}
        //         return (null, user);
        //        }) 
        //     }
        // });
        User.findOne({ email: profile.emails[0].value })
        .exec()
        .then(user => {
            if (user) {
                // If found, set this user as req.user
                return done(null, user);
            } else {
                // If not found, create the user and set it as req.user
                return User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
                });
            }
        })
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            console.log('Error in google strategy-passport', err);
            return done(err);
        });

    }
))



module.exports=passport;