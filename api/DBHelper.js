var mongodb = require('mongodb');
var dbServer = new mongodb.Server('localhost', 27017);
var db = new mongodb.Db('test1705candel', dbServer);
var apiResult = require('./ApiResult.js');

var obj = {
	insert: function(_collection, _data, _callback){
		db.open(function(error, db){
			if(error){
				_callback(apiResult(false, null, error));
				return false;
			}
			db.collection(_collection, function(error, collection){
				if(error){
					_callback(apiResult(false, null, error));
					return false;					
				}
				collection.insert(_data);
				_callback(apiResult(true));
				db.close();
			})
		})
	},
	find: function(collection, data, callback){},
	delete: function(collection, data, callback){},
	update: function(collection, data, callback){}
}

module.exports = obj;