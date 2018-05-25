var User = require('./models/user');
var mongoose = require('mongoose');
var secrets = require('./secrets.js');

//database.connect - Connects the server to the database.
//Syntax:
//database.connect();
//
//This must be run before doing any other database commands.
function connect(callback){
  mongoose.connect('mongodb://' + this.username + ':' + secrets.password + '@' + this.url + '/' + this.dbName);

  mongoose.connection.on('connected', function(){
    console.log('succesfully connected to database');
    callback();
  });

  mongoose.connection.on('error', function(err){
    console.log('ERROR CONNECTING TO DATABASE: ', err);
    process.exit(1);
  });
}

//database.createUser - Adds a user to the database.
//Syntax:
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
//db.createUser('Drew', [{name : 'CNN', type : 'PODCAST', url : 'http://rss.cnn.com/rss/cnn_topstories.rss'}],
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
async function createUser(name, feeds, callback){
  console.log('creating user');
  callback = callback || function(){};
  //count the number of users with the proposed name for the user
  User.count({name : name}, function(err, count){
    //if there was an error, handle it
    //if(err){
    //  console.log('could not count users');
    //  callback(err);
    //}else{
      //if there is no user with the proposed name, continue
      //if(count <= 0){
        var newUser = new User();
        newUser.name = name;
        //for(let i = 0; i < feeds.length; i++){
        //  newUser.feeds.push({ name: feeds[i].name, type: feeds[i].type, url: feeds[i].url})
        //}
        //adds new user to database
        newUser.save(function (err){
          if (err){
            console.log('Error saving user: ', err);
            callback(err);
          }else{
            console.log('succesfully saved user');
            callback();
          }
        });
      //}
    //}
  });
}

function getStatus(){
  if(mongoose.connection.readyState == 0){
    return 'Not Connected';
  }else if(mongoose.connection.readyState == 1){
    return 'Connected';
  }else if(mongoose.connection.readyState == 2){
    return 'Connecting...';
  }else if(mongoose.connection.readyState == 3){
    return 'Disconnecting...';
  }
}

function getAllUserNames(callback){
  var usernames = [];
  User.find({}, function(err, users) {
    console.log(users[2]);
    for(let i = 0; i < users.length; i++){
      //console.log(users[i].name);
      usernames.push(users[i].name);
    }
    console.log(usernames);
    callback(usernames);
  });
}
var getUser = require('./userControl.js');
module.exports = {
  connect : connect,
  url : 'classmongo.engr.oregonstate.edu',
  username : 'cs290_ortegadr',
  dbName : 'cs290_ortegadr',
  createUser : createUser,
  getUser : getUser,
  getStatus : getStatus,
  getAllUserNames : getAllUserNames
}
