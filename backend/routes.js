var express = require('express');
var router = express.Router();
var models = require('./models/models');
var Document = models.Document;


// router.use('/', function(req, res, next){
//   // console.log("logging req.user: " + req.user._id);
//   // console.log("logging req.username: " + req.user.username);
//   console.log('req.user', req.user);
//   if (!req.user._id) {
//     res.status(401).json({success: false, error: "Error: You are not logged in."})
//   } else {
//     next();
//   }
// });

router.get('/getDoc/:docid', (req, res) => {
  console.log('please print this');
  Document.findById(req.params.docid, (err, result) => {
    if (err) { res.status(500).json({ success: false, error: err }) }
    else { res.status(200).json({ success: true, doc: result }) }
  })
})

router.post('/updateDoc/:docid', (req, res) => {
  Document.update({ _id: req.params.docid },
    { $set: { content: req.body.currDocContents }}, (err, result) => {
      if (err) { res.json({ success: false, error: err }); }
      else { res.json({ success: true, result: result }); }
  });
});

router.post('/createdoc', function(req, res) {
  console.log("reached /createdoc endpoint...");
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

router.get('/fetchdocs', function(req, res) {
  console.log("Reached /fetchdocs endpoint");
  console.log("Attempting to retrieve documents...");
  Document
  .find({owner: req.user._id})
  .populate('owner')
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
});

router.post('/save/:docID', function(req, res) {
  Document.findOne({_id: req.params.docID}, function(err, doc) {
    if (err) { res.status(500).json({error: err}) }
    else {
      var newHistory = doc.history;
      console.log('newHistory', newHistory);
      newHistory.push(req.body.currDocContents[0]);
      console.log('newHistory', newHistory);
      Document.update(
        {_id: req.params.docID},
        { $set: {'history': newHistory} }
       ).exec()
      .then((response) => {
        res.status(200).json({success: true, response: response})
      })
      .catch((err) => {
        res.status(500).json({success: false})
      })
    }
  })
})

module.exports = router;
