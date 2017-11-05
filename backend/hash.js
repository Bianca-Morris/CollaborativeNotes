var crypto = require('crypto');

// Uses sha256 to hash user login passwords
function hashPassword(password) {
  var hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

module.exports = hashPassword;
