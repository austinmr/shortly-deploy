var mongo = require('mongodb');

var MongoClient = mongo.MongoClient; 
var url = 'mongodb://localhost:27017/Drake';

MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log('We had an error: ', err); 
  } else {
    console.log('Established a mongoDB database at ', url); 
    db.close(); 
  }
}); 