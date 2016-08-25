var express = require('express');
var partials = require('express-partials');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var util = require('./lib/utility');

var handler = require('./lib/request-handler');


///////////////
// MONGODB
var mongo = require('mongodb');
var mongoose = require('mongoose');  
// var monk = require('monk'); 
// var db = monk('localhost:27017/node')

var MongoClient = mongo.MongoClient; 
var url = 'mongodb://localhost:27017/testDatabase';

MongoClient.connect(url, function(err, db) {
  if (err) {
    console.log('We had an error: ', err); 
  } else {
    console.log('Established a mongoDB database at ', url); 
    console.log('Writing some user data now to collection "users"!'); 
  }
}); 

mongoose.connect('mongodb://localhost/testDatabase');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('We connected to MongoDB / Mongoose'); 
  
});


var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser('shhhh, very secret'));
app.use(session({
  secret: 'shhh, it\'s a secret',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  req.db = db;
  // console.log('This route has acess to the following MongoDB database');
  next();
});

app.get('/', util.checkUser, handler.renderIndex);
app.get('/create', util.checkUser, handler.renderIndex);

app.get('/links', util.checkUser, handler.fetchLinks);
app.post('/links', handler.saveLink);

app.get('/login', handler.loginUserForm);
app.post('/login', handler.loginUser);
app.get('/logout', handler.logoutUser);

app.get('/signup', handler.signupUserForm);
app.post('/signup', handler.signupUser);

app.get('/*', handler.navToLink);

module.exports = app;
