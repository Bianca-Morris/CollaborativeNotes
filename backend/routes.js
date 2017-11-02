var express = require('express');
var router = express.Router();
var models = require('./models/models');
var Document = models.Document;

router.post('/createdoc', function(req, res) {
  var doc = new models.Document({
    owner: req.body.owner,
    collaborators: req.body.collaborators,
    password: req.body.password,
    history: req.body.history
  });
  doc.save(function(err, user) {
    if (err) {
      console.log(err);
      res.status(500).json({success: false});
      return;
    } else {
      console.log('IT WENT THROUGH PASSPORT');
      res.status(200).json({success: true, doc: doc});
    }
  });
});

module.exports = router;
