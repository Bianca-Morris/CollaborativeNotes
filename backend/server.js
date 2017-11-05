// Create an instance of express, run it on an http server
const express = require('express');
const app = require('express')();
var server = require('http').Server(app);
// Tell the app's server to use websockets
var io = require('socket.io')(server);
// Import models and routes
var models = require('./models/models');
const auth = require('./auth');
const routes = require('./routes');

var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json({extended: true}));

var session = require('express-session');

// Prepare database for storing user data and sessions
var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI || require('./connect');
mongoose.connect(connect);
var MongoStore = require('connect-mongo')(session);

// Prepare passport modules for user authentication
var passport = require('passport');
var LocalStrategy = require('passport-local');

// Middleware to get express-session storing session data in MongoDB
app.use(session({
  secret: process.env.SECRET_KEY,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

var hashPassword = require('./hash');
// Strategy used to log in users
passport.use(new LocalStrategy(function(username, password, done){
 //find the user with the given username
 console.log('Authenticating...')
 var hashedPassword = hashPassword(password);
 models.User.findOne({username: username, password: hashedPassword}, function(err, user) {
   //if error, finish trying to authenticate
   if (err) { return done(err); }
   //if no user present auth failed
   if (!user) { return done(null, false, { message: 'Incorrect username.' }); }
   // auth has succeeded
   return done(null, user);
 });
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', auth(passport));
app.use('/', routes);

io.on('connection', function(socket) {
  socket.on('openedDocument', function(docid) {
    socket.join(docid);
  })
  socket.on('changeName', function(username) {
    socket.username = username;
  })
  socket.on('update', function(edState) {
    socket.broadcast.emit('update', edState)
  })
})

// Example route
// app.get('/', function (req, res) {
//   // res.send('Hello World!')
// })


server.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!')
})
