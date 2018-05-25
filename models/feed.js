var mongoose = require('mongoose');
var feedSchema = mongoose.Schema({
  name : String,
  type : String,
  url : String
});

module.exports = mongoose.model('Feed', feedSchema);
