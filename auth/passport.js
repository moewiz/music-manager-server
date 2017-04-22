const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
const User = require('../models/user');
const config = require('../config.js');

module.exports = function (passport) {
  const opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload.exp <= Date.now())
      return res.status(400).json('Access token has expired.');

    User.findUserById(jwt_payload.iss, (err, user) => {
      if (err)
        return done(err, false);
      if (user)
        done(null, user);
      else
        return done(null, false);
    });
  }));
};
