var db = require('../common/dbControl');
var mongodb = require('mongodb');

module.exports = {
	Register: function(app){
		//场景
		app.get('/getsale', function(req, res){
			var params = req.query;
			db.select('masket', {}, function(result){
				// console.log(result);
				res.send(result);
			});
		})
		app.post('/addsale', function(req, res){
			db.insert('masket', req.body, function(result){
				// console.log(result);
				res.send({state: true});
			})
		})
		app.get('/deletesale', function(req, res){
			var id = req.query.id;
			var objectid = new mongodb.ObjectID.createFromHexString(id);//将字符串转换成一个 objectid
			db.delele('masket', {'_id': objectid})
		})
	}
}