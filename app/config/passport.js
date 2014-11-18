
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var hash = require('node_hash');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({email:email}).exec(function(err, user) {
        if (err) {
          return done (err);
        }
        if (!user) {
          return done (null, false, {message: 'account doesn\'t exist'});
        }
        var hashed_password = hash.sha512(password, user.salt);
        if (hashed_password != user.password) {
          return done(null, false, {message: 'password doesn\'t match'});
        }
        delete user.password;
        delete user.salt;
        return done (null, user);
      });
    }
  )
);

module.exports.passport = passport;
