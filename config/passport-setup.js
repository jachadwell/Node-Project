var passport       = require('passport');
var GoogleStrategy = require('passport-google-oauth20');
var keys           = require('./keys');
var User           = require('../models/user-model');

//serializing users
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
})

passport.use(
    new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: "/auth/google/redirect"
    }, function(accessToken, refreshToken, profile, done){
        User.findOne({googleID: profile.id}).then((currentUser) => {
            if(currentUser){
                //already have user
                console.log('Logging in user: ' + currentUser);
                done(null, currentUser);
            }else{
                //if user doesnt exist create a new one in db
                new User({
                    username: profile.displayName,
                    googleID: profile.id
                }).save().then((newUser) => {
                    console.log('new user created: ' + newUser);
                    done(null, newUser);
                });
            }
        });
    })
)