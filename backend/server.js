const express = require('express')
const app = express()
var models = require('./models/models');
const auth = require('./auth');
const routes = require('./routes');


var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

var bodyParser = require('body-parser');
app.use(bodyParser.json({extended: true}));

var cookieSession = require('cookie-session');
app.use(cookieSession({
  keys: ['my super secret key']
}));

var passport = require('passport');
var LocalStrategy = require('passport-local');

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done){
 //find the user with the given username
 console.log('Authenticating...')
 models.User.findOne({username: username, password: password}, function(err, user) {
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

// Example route
// app.get('/', function (req, res) {
//   // res.send('Hello World!')
// })


app.listen(3000, function () {
  console.log('Backend server for Electron App running on port 3000!')
})
