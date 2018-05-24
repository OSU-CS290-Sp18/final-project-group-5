var mongoose = require('mongoose');
var Feed = require('./feed.js');
var userSchema = mongoose.Schema({
  name : String,
  feeds : [Feed]
});
module.exports = mongoose.model('User', userSchema)
