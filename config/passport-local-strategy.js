const passport = require("passport");

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


//authetication using passport
passport.use(new LocalStrategy({
        usernameField:'email'
    },
    function(email,password,done){
        //find a user and establish the identity
        //db email val: val passed in func
        // User.findOne({email: email}, function(err,user)
        // {
        //     if(err){
        //         console.log('Error in finding user --> Passport');
        //         return done(err);
        //     }
        //     if(!user || user.password!= password){
        //         console.log('Invalid Username/Password');
        //         return done(null, false);
        //     }

        //     return done(null,user);
        // });  
        User.findOne({ email: email })
    .then((user) => {
        if (!user || user.password !== password) {
            console.log('Invalid Username/Password');
            return Promise.reject(null);
        }
        return Promise.resolve(user);
    })
    .then((user) => {
        return done(null, user);
    })
    .catch((err) => {
        console.log('Error in finding user --> Passport');
        return done(err);
    });
 

    }

));

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    // User.findById(id, function(err,user){
    //     if(err){
    //         console.log('Error in finding user --> Passport');
    //         return done(err);
    //     }

    //     return done(null, user);
    // });
    User.findById(id)
    .then((user) => {
        if (!user) {
            console.log('User not found');
            return Promise.reject(null);
        }
        return Promise.resolve(user);
    })
    .then((user) => {
        return done(null, user);
    })
    .catch((err) => {
        console.log('Error in finding user --> Passport');
        return done(err);
    });

});



module.exports=passport;