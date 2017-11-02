var express = require('express');
var router = express.Router();
var models = require('./models/models');
var Document = models.Document;


router.use('/', function(req, res, next){
  console.log("logging req.user: " + req.user._id);
  console.log("logging req.username: " + req.user.username);
  if (!req.user._id) {
    res.status(401).json({success: false, error: "Error: You are not logged in."})
  } else {
    next();
  }
});

router.post('/createdoc', function(req, res) {
  console.log("reached /createdoc endpoint...")
  console.log('REQ.BODY.TITLE', req.body.docTitle);
  var doc = new models.Document({
    title: req.body.docTitle,
    owner: req.user._id,
    collaborators: [req.user._id],
    password: '',
    history: [],
  });
  console.log("attempting to save new document...")
  doc.save(function(err, user) {
    if (err) {
      console.log(err);
      res.status(500).json({success: false});
      return;
    } else {
      console.log('Document successfully saved to database.');
      res.status(200).json({success: true, doc: doc});
    }
  });
});

router.get('/fetchuserdocs', function(req, res) {

});

module.exports = router;
