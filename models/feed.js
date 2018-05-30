var mongoose = require('mongoose');
var feedSchema = mongoose.Schema({
  name : String,
  type : String,
  url : String,
  users : [{type:mongoose.Schema.Types.ObjectId, ref : 'User'}]
});

module.exports = mongoose.model('Feed', feedSchema);
