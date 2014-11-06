/**
 * StorageController
 *
 * @description :: Server-side logic for managing Storages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var flat = require('flat');


module.exports = {
	get: function(req, res){
		var path = req.params.path || '';
		path = path.replace(/(^\/+)|(\/+$)/g,'').replace(/\//g, '.');
		// sails.log('path: ' + path);
		var query = Storage.find().where({'path': {startsWith: path}});

		query.exec(function(err, data){
			if (err){
				sails.log(err);
				return res.send(500, err);
			}
			if (data === undefined || data.length < 1 ){
				return res.send(404);
			}
			if (data.length === 1 && !data[0].path.replace(path, '')){
				return res.send(200, data[0].data);
			}
			var flatResult = {};
			data.forEach(function(entry){
				var location = entry.path.replace(path, '').replace(/(^\.+)|(\.+$)/g,'');
				flatResult[location] = entry.data;
			});
			var result = flat.unflatten(flatResult);
			res.json(200, result);
		});
	},

	set: function(req, res){
		var path = req.params.path || '';
		path = path.replace(/(^\/+)|(\/+$)/g,'').replace(/\//g, '.');
		Storage.destroy({'path': {startsWith: path}}, function(err, deleted){
			if (err){
				sails.log.error(err);
				return res.send(500, err);
			}
			try{
				var data = JSON.parse(req.body.value);
			} catch (e){
				return res.send(400, {error: 'value must be valid json'});
			}
			if (!_.isObject(data)){
				return Storage.create(
					{
						path: path,
						data: data
					},
					function(err, created){
					if (err){
						sails.log.error(err);
						return res.send(500, err);
					}
					res.send(200);
				});
			}
			var flatValue = flat(data);
			var records = [];
			_.forIn(flatValue, function(value, key){
				var fullPath = path ? path + '.' + key : key;
				records.push({
					path: fullPath,
					data: value
				});
			});
			Storage.create(records, function(err, created){
				if (err){
					sails.log.error(err);
					return res.send(500, err);
				}
				res.send(200);
			});
		});
	},

	update: function(req, res){

	},

	remove: function(req, res){

	}
};
