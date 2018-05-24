var mongoose = require('mongoose');
var Feed = require('/models/feed.js');
var userSchema = mongoose.Schema({
  name : String,
  feeds : [Feed]
});
module.exports = mongoose.model('User', userSchema)

userSchema.methods.addFeed = function(name, type, ){
  this.feeds.create({ name })
}
