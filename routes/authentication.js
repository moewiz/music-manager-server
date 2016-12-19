let express = require('express');
let moment = require('moment');
let router = express.Router();
let config = require('../config');
let jwt = require('jwt-simple');

let User = require('../models/user');

router.post('/signup', function (req, res) {
  if (!req.body.username || !req.body.password) {
    return res.json({ success: false, msg: 'Please enter username and password.' });
  } else {
    let newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the new user
    newUser.save((err) => {
      if (err) {
        return res.json({ success: false, msg: 'Username already exists.' })
      }
      res.json({ success: true, msg: 'Successfully created new user.' })
    });
  }
});

router.post('/login', (req, res, next) => {
  User.findUserByUsername(req.body.username, function (err, user) {
    if (err) throw err;
    if (!user) {
      return res.status(403).json({ success: false, msg: 'Authentication failed. Wrong username or password.' });
    } else {
      // check password
      user.comparePassword(req.body.password, (err, isMatch) => {
        // user is found and password is right => create a token
        let expires = moment().add(7, 'days').valueOf();
        if (isMatch && !err) {
          let token = jwt.encode({
            iss: user._id,
            exp: expires
          }, config.secret);
          // return the information including token as JSON
          res.status(200).json({
            success: true,
            token: 'JWT ' + token,
            expires: expires,
            user: user
          });
        } else {
          return res.status(403).json({ success: false, msg: 'Authentication failed! Wrong username or password.' });
        }
      });
    }
  });
});

module.exports = router;
