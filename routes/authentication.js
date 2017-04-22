const express = require('express');
const moment = require('moment');
const router = express.Router();
const config = require('../config');
const jwt = require('jwt-simple');
const User = require('../models/user');

router.post('/signup', function (req, res) {
  if (!req.body.username || !req.body.password)
    return res.json({success: false, msg: 'Please enter username and password.'});

  const newUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  // save the new user
  newUser.save((err) => {
    if (err)
      return res.json({success: false, msg: 'Username already exists.'});
    res.json({success: true, msg: 'Successfully created new user.'});
  });
});

router.post('/login', (req, res) => {
  User.findUserByUsername(req.body.username, function (err, user) {
    if (err) throw err;
    if (!user)
      return res.status(401).json({success: false, msg: 'Authentication failed. Wrong username or password.'});

    // check password
    user.comparePassword(req.body.password, (error, isMatch) => {
      // user is found and password is right => create a token
      const expires = moment().add(7, 'days').valueOf();

      if (isMatch && !error) {
        const token = jwt.encode({
          iss: user._id,
          exp: expires
        }, config.secret);

        // return the information including token as JSON
        return res.status(200).json({
          success: true,
          token: 'JWT ' + token
        });
      }
      return res.status(401).json({success: false, msg: 'Authentication failed! Wrong username or password.'});
    });
  });
});

module.exports = router;
