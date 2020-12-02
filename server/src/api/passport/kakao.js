//npm install passport-kakao
let KakaoStrategy = require("passport-kakao").Strategy;
let config = require("../config");

module.exports = function (app, passport) {
  return new KakaoStrategy(
    {
      clientID: config.kakao.clientID,
      clientSecret: config.kakao.clientSecret,
      callbackURL: config.kakao.callbackURL,
      profileFields: ["id", "emails", "displayName"],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("passport의 kakao");
      console.dir(profile);

      let database = app.get("database");
      database.UserModel.findOne({ userid: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          let user = new database.UserModel({
            name: profile.username,
            userid: profile.id,
            provider: "kakao",
            authToken: accessToken,
            kakao: profile._json,
          });

          user.save((err) => {
            if (err) {
              throw err;
            }
            return done(null, user);
          });
        } else {
          return done(null, user);
        }
      });
    }
  );
};
