//npm install passport-facebook
let FacebookStrategy = require('passport-facebook').Strategy;
let config = require('../config');
const { json } = require('express');

module.exports = function(app,passport){
    return new FacebookStrategy(
        {
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        profileFields: ['id','emails','displayName']
        }, (accessToken, refreshToken, profile, done) =>{
            console.log('passport의 facebook호출');
            console.dir(profile);


            let database = app.get('database');
            database.UserModel.findOne({'userid': profile.id},(err,user)=>{
                if(err) {return done(err)};
                if(!user){
                    let user = new database.UserModel({
                        name: profile.displayName,
                        userid: profile.id,
                        provider: 'facebook',
                        authToken: accessToken,
                        facebook: profile._json
                    });

                    user.save((err)=>{
                        if(err) {throw err;}
                        return done(null, user);
                    });
                }else{
                    return done(null, user);
                }
            });
        }
    );
};