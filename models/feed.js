var mongoose = require('mongoose');
var Feed = require('/feedType.js')
var feedSchema = mongoose.Schema({
  name : String,
  type : Feed,
  url : String
  users : {type: Schema.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Feed', userSchema);
