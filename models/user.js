const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', (next) => {
  const user = this;

  if (this.isModified('password') || this.isNew)
    bcrypt.genSalt(10, (err, salt) => {
      if (err)
        return next(err);

      bcrypt.hash(user.password, salt, (error, hash) => {
        if (error)
          return next(error);

        user.password = hash;
        next();
      });
    });
  else
    return next();

});

userSchema.methods.comparePassword = (pwd, callback) => {
  bcrypt.compare(pwd, this.password, (err, isMatch) => {
    if (err)
      return callback(err);

    callback(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

User.findUserByUsername = (username, callback) => {
  const query = {username};

  User.findOne(query, callback);
};

User.findUserById = (id, callback) => {
  const query = {_id: new ObjectId(id)};

  User.findOne(query, callback);
};

module.exports = User;