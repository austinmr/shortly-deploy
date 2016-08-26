// var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

// module.exports = User;

var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
});

var User = mongoose.model('User', userSchema); 

// Utilize the pre save hook to implement the hashPassword functionality. 
// we want to leave the Promisified version of the bcrypt hash 

User.comparePassword = function (attemptedPassword, savedPassword, callback) {
  console.log('THIS USER IS CHECKING PASSWORDS'); 
  bcrypt.compare(attemptedPassword, savedPassword, function(err, isMatch) {
    if (err) {
      return callback(err); 
    } else {
      callback(null, isMatch);
    }
  });
};


userSchema.pre('save', function (next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next(); 
    }); 
});

module.exports = User;
