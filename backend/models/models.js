var mongoose = require('mongoose');

var connect = process.env.MONGODB_URI || require('./connect');
mongoose.connect(connect);

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
    required: true
  },
});

userSchema.methods.getFollowRelations = function (callback){
    var youFollow = [];
    var followYou = [];
    var saveUserId = this._id;
    // peopleWhoFollowYou
    Follow.find({following: this._id}).populate('follower').exec(function(err, peopleWhoFollowYou){
      if(err) {
        res.send(err);
      } else {
        // peopleYouFollow
        Follow.find({follower: saveUserId}).populate('following').exec(function(err, peopleYouFollow){
          if (err) {
            res.send(err);
          } else {
            callback(null, peopleYouFollow, peopleWhoFollowYou);
          }
        })
      }
    })
}


var User = mongoose.model('User', userSchema);
var Document = mongoose.model('Document', documentSchema);

module.exports = {
  User: User,
  Document: Document,
};
