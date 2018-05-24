var User = require('/models/user');
var Feed = require('/models/feed');
var mongoose = require('mongoose');

async function connect(callback){
  mongoose.connect(configDB.url, function(err, db){
    if(err){
      callback(err);
    }else{
      callback();
    }
  });
}
//database.createUser(name, feeds, callback(err){});
//name : String, the unique name for the user.
//feeds : array, of js objects (OPTIONAL):
//      name : String, friendly name of site
//      type : feedType, type of feeds, use '/feedType.js' object
//      url  : String, contains valid rss url
//callback(err) : A callback function when the code is complete
//
//Example
//
//db = require('database.js')
//FeedType = require('feedType.js')
//db.createUser('Drew', [{name : 'CNN', type : PODCAST, url : 'http://rss.cnn.com/rss/cnn_topstories.rss'}],
//      callback(err){
//   if(!err){
//     console.log('Hooray!');
//   }else{
//     //handle error here...
//   }
//});
//
//Example 2
//
//db.createUser('Huong', null, callback(err){
//  //if err, handle here.
//}
async function createUser(db, name, feeds, callback){
  User.count({}, function(err, count){
    if(err){
      callback(err);
    }else{
      if(count <= 0){
        var newUser = new User();
        newUser.name = name;
        for(int i = 0; i < links.length; i++){
          newUser.feeds.push({ name: feeds[i].name, type: feeds[i].type, url: feeds[i].url})
        }
        newUser.save(function (err){
          if (err){
            callback(err);
          }else{
            callback();
          }
        });
      }
    }
  });
}
module.exports {
  connect : connect,
  url : 'mongodb://classmongo.engr.oregonstate.edu/cs290_ortegadr',
  username : 'cs290_ortegadr',
  createUser : createUser
}
