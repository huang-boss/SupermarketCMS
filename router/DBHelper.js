var mongodb = require('mongodb');
var dbServer = new mongodb.Server('10.3.131.15 ', 27017);
var db = new mongodb.Db('sm', dbServer);
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
	select: function(_collection, _data, _callback){
		db.open(function(error, db){
			if(error){
				_callback({status: false, message: error});
			} else {
				db.collection(_collection, function(error, collection){
					if(error){
						_callback({status: false, message: error});
					} else {
						collection.find(_condition || {}).toAarry(function(error, dataset){
							if(error){
								_callback({status: false, message: error});
							} else {
								_callback({status: true, data: dataset});
							}
						})
					}
				})
			}
		})
	},
	delete: function(collection, data, callback){
		db.open(function(error, db){
			if(error){
				_callback({status: false, message: error});
			} else {
				db.collection(_collection, function(error, collection){
					if(error){
						_callback({status: false, message: error});
					} else {
                       collection.remove({title:'hello'},{safe:true},function(error,result){
                          console.log(result);
							if(error){
								_callback({status: false, message: error});
							} else {
								_callback({status: true, data: dataset});
							}
						})
					}
				})
			}
		})  

	},
	
	// update: function(collection, data, callback){
	// 	db.open(function(error, db){
	// 		if(error){
	// 			_callback({status: false, message: error});
	// 		} else {
	// 			db.collection(_collection, function(error, collection){
	// 				if(error){
	// 					_callback({status: false, message: error});
	// 				} else {
	// 					collection.update({title:'hello'}, {$set:{number:3}}, {safe:true}, function(err, result){
	// 					    console.log(result);
	// 						if(error){
	// 							_callback({status: false, message: error});
	// 						} else {
	// 							_callback({status: true, data: dataset});
	// 						}
	// 					})
	// 				}
	// 			})
	// 		}
	// 	})  
	// }
}

module.exports = obj;