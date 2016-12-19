let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = mongoose.Types.ObjectId;
let bcrypt = require('bcrypt');

let userSchema = new Schema({
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

userSchema.pre('save', function (next) {
  let user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (pwd, callback) {
  bcrypt.compare(pwd, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
}

let User = mongoose.model('User', userSchema);

User.findUserByUsername = (username, callback) => {
  let query = { username: username };
  User.findOne(query, callback);
}

User.findUserById = (id, callback) => {
  let query = { _id: new ObjectId(id) };
  User.findOne(query, callback);
}

module.exports = User;