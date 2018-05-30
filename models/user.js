var mongoose = require('mongoose');
var Feed = require('./feed.js');
var userSchema = mongoose.Schema({
  name : String,
  feeds : [{type:mongoose.Schema.Types.ObjectId, ref : 'Feed'}]
});
userSchema.methods.addFeed = function(name, type, url){
  feeds.create({name : name, type : type, url : url});
}
module.exports = mongoose.model('User', userSchema)
