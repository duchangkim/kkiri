let GoogleStrategy = require('passport-google-oauth20').Strategy;
let config = require('../config');

module.exports = function(app,passport){
    return new GoogleStrategy(
        {
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        profileFields: ['id','emails','displayName']
        }, (accessToken, refreshToken, profile, done) =>{
            console.log('passport의 google');
            console.dir(profile);


            let database = app.get('database');
            database.UserModel.findOne({'userid': profile.id},(err,user)=>{
                if(err) {return done(err)};
                if(!user){
                    let user = new database.UserModel({
                        name: profile.displayName,
                        userid: profile.id,
                        provider: 'google',
                        authToken: accessToken,
                        google: profile._json
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