var db = require('../common/dbControl.js');
var mongodb = require('mongodb');
var path = require('path');
// var url = require('url');

module.exports = {
	Register: function(app){
		//场景
		app.get('/purchase', function(req, res){
			var params = req.query;
			db.select('purchase', {}, function(result){
				// console.log(result);
				res.send(result);
			});
		})

		app.post('/addpurchase', function(req, res){
			db.insert('purchase', req.body, function(result){
				res.send(result);
			})
		})

		app.post('/updatepurchase', function(req, res){
			db.update('purchase', {'number':req.body.number},req.body,function(result){
                res.send({status: true});
            })
		})

		app.post('/deletepurchase', function(req, res){
		    db.delete('purchase', {'number':req.body.number},function(result){
		        res.send({status: true});
		    })
		})

	}
}