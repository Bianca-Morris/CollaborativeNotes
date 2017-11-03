// Add Passport-related auth routes here.
var express = require('express');
var router = express.Router();
var models = require('./models/models');

module.exports = function(passport) {
  router.post('/signup', function(req, res) {
    console.log('Reaching /signup endpoint.');
    if (req.body.username.length < 3) {
      res.status(400).json({success: false, status: 400, error: "Username must be at least 3 characters."});
    } else if (req.body.password.length < 6) {
      res.status(400).json({success: false, status: 400, error: "Password must be at least 6 characters."});
    } else if (req.body.password !== req.body.password2) {
      res.status(400).json({success: false, status: 400, error: "Passwords must match!"});
    } else {
        var u = new models.User({
          username: req.body.username,
          password: req.body.password
        });
        u.save(function(err, user) {
          if (err) {
            if (err.code === 11000){
              console.log("Duplicate user")
              res.status(500).json({success: false, status: 500, error: "There already exists a user with that username!"});
            } else {
              console.log("Error saving user: " + err);
              res.status(500).json({success: false, status: 500, error: "Couldn't save new user... Try again later."});
            }
          } else {
            console.log('New user saved successfully.');
            res.status(200).json({success: true, status: 200, user: u});
          };
        });
      }
  });
  // router.get('/signup', function(req, res) {
  //   res.render('signup');
  // });
  // router.get('/login', function(req, res) {
  //   res.render('login');
  // });
  router.get('/login/success', function(req, res) {
    res.status(200).json({success: true, note: 'it got to login success'});
  });
  router.get('/login/failure', function(req, res) {
    res.status(400).json({success: false});
  });
  router.post('/login', passport.authenticate('local', {
    successRedirect: '/login/success',
    failureRedirect: '/login/failure'
  }));

  // // fb login
  // router.get('/fb/login', passport.authenticate('facebook'));
  // router.get('/fb/login/callback', passport.authenticate('facebook', {
  //   successRedirect: '/',
  //   failureRedirect: '/fail'
  // }));
  // router.get('/fail', function(req, res) {
  //   res.status(401).send('Failed to login with Facebook.');
  // });
  router.get('/logout', function(req, res) {
    req.logout();
  });


  return router;
};
