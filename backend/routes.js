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
      res.status(500).json({success: false, error: "Couldn't save new document."});
      return;
    } else {
      res.status(200).json({success: true, doc: doc});
    }
  });
});

<<<<<<< HEAD
router.post('/save/documentID', function(req, res) {
  console.log("reached /createdoc endpoint...")
  console.log('REQ.BODY', req.body);
  Document.find({_id: "59fb66cd58f680350bde1a22"}, function(err, document) {
    console.log('DOCUMENT', document);
    var pastHistory = document[0].history;
    console.log('pastHistory', pastHistory);
    console.log('req.body.currDocContents', req.body.currDocContents);
    var newHistory = pastHistory.push(req.body.currDocContents);
    console.log('newHistory', newHistory);
  });
  db.documents.update(
    {_id: "59fb66cd58f680350bde1a22"},
    { $set: { "history": newHistory} }
  )
  // var doc = new models.Document({
  //   title: req.body.docTitle,
  //   owner: req.user._id,
  //   collaborators: [req.user._id],
  //   password: '',
  //   history: [],
  // });
  // console.log("attempting to save new document...")
  // doc.save(function(err, user) {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).json({success: false});
  //     return;
  //   } else {
  //     console.log('Document successfully saved to database.');
  //     res.status(200).json({success: true, doc: doc});
  //   }
  // });
});

router.get('/fetchuserdocs', function(req, res) {

=======
router.get('/fetchdocs', function(req, res) {
  console.log("Reached /fetchdocs endpoint");
  console.log("Attempting to retrieve documents...");
  Document
  .find({owner: req.user._id})
  .exec(function (err, docs){
     if (err) {
       console.log("Error retrieving documents: " + err);
       res.status(500).json({success: false, error: err });
     } else if (docs.length < 1) {
       console.log("No documents available.")
       res.status(200).json({success: true, docs: null, user: req.user.username });
     } else {
       console.log("Documents successfully retrieved from database")
       res.status(200).json({success: true, docs: docs, user: req.user.username});
     }
  });
>>>>>>> 6c0c395325b49e7c71a79776b1626591ef53930d
});

module.exports = router;
