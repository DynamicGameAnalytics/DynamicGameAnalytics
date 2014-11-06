/**
* AuthenticateController
*
* @description :: Server-side logic for managing authenticates
* @help        :: See http://links.sailsjs.org/docs/controllers
*/

var passport = require('passport');
var hash = require('node_hash');
var crypto = require('crypto');

function passportLogin(req, res, user){
	req.login(user, function(err){
		if (err) {
			sails.log.error(err);
			return res.send(500, err);
		}
		tokens.getUserToken(user, function(err, token){
			if (err) {
				sails.log.error(err);
				return res.send(500, err);
			}
			res.send(200, {token: token});
		}, true);
	});
}

module.exports = {

	login: function(req, res) {
		passport.authenticate('local', function(err, user, info){
			if (err) {
				sails.log.error(err);
				return res.send(500, err);
			}
			if (!user){
				return res.send(401, info);
			}
			passportLogin(req, res, user);

		})(req, res);
	},

	register: function(req, res){
		var email = req.body.email;
		var password = req.body.password;
		crypto.randomBytes(64, function(ex, buf) {
			if (ex) return res.send(500, {error: ex});
			var salt = buf.toString('hex');
			var hashed = hash.sha512(password, salt);
			User.create({email: email, password: hashed, salt: salt}).exec(function(err, user){
				if (err){
					return res.send(500, {error: err});
				}
				return passportLogin(req, res, user);
			});
		});
	},

	logout: function(req, res) {
		req.logout();
		res.send(200);
	}
};
