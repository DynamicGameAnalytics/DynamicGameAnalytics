var crypto = require('crypto');

module.exports = {
  generateToken: function(cb) {
    crypto.randomBytes(64, function(err, buf){ // create random token
      if (err) {
        return cb(err, null);
      }
      var token = buf.toString('hex');
      return cb(null, token);
    });
  },

  updateUserToken: function(user, token, cb) {
    redis.multi();
    redis.hmset(token, {user: user.id}); // store token in redis
    redis.expire(token, 50);
    redis.exec();
    User.update(user.id, {token: token}, function(err, user){
      cb(err, user);
    });
  },

  generateUserToken: function(user, cb) {
    module.exports.generateToken(function(err, token){
      if (err)
        return cb(err, null);
      module.exports.updateUserToken(user, token, function(err, user){
        cb(err, token);
      });
    });
  },

  getUserToken: function(user, cb, generateIfNotFound) {
    var token = user.token | null;
    if (token){
      redis.ttl(token).then(function(reply){
        if (reply > 0){
          return cb(null, token);
        }
        if (generateIfNotFound){
          module.exports.generateUserToken(user, function (err, newToken){
            if (err){
              return cb(err, null);
            }
            return cb(null, newToken);
          });
        }
        else {
          return cb (null, null);
        }
      });
    }
    else {
      if (generateIfNotFound){
        module.exports.generateUserToken(user, function (err, newToken){
          if (err){
            return cb(err, null);
          }
          return cb(null, newToken);
        });
      }
      else {
        return cb (null, null);
      }
    }
  },
}
