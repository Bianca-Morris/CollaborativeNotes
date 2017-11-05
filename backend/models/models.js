var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

var documentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  collaborators: {
    type: Array,
    required: true
  },
  password: {
    type: String,
    required: false
  },
  history: {
    type: Array,
    required: false
  },
});

var User = mongoose.model('User', userSchema);
var Document = mongoose.model('Document', documentSchema);

module.exports = {
  User: User,
  Document: Document,
};
