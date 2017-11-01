// Add Passport-related auth routes here.
var express = require('express');
var router = express.Router();
var models = require('./models/models');

module.exports = function(passport) {
  router.post('/signup', function(req, res) {
    console.log('reaches');
    console.log('ru', req.body.username);
    var u = new models.User({
      username: req.body.username,
      password: req.body.password
    });
    u.save(function(err, user) {
      if (err) {
        console.log(err);
        res.status(500).json({success: false});
        return;
      } else {
        res.status(200).json({success: true, user: u});
      }
    });
  });




  // router.get('/signup', function(req, res) {
  //   res.render('signup');
  // });
  // router.get('/login', function(req, res) {
  //   res.render('login');
  // });
  router.get('/login/success', function(req, res) {
    res.status(200).json({success: true});
  })
  router.get('/login/failure', function(req, res) {
    res.status(400).json({success: false});
  })
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
  // router.get('/logout', function(req, res) {
  //   req.logout();
  //   res.redirect('/login');
  // });
  return router;
};
