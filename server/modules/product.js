/* 
* @Author: 陈文贵
* @Date:   2017-10-18 11:14:45
*/

var db = require('../routers/router');
var mongodb = require('mongodb');

module.exports = {
    Register: function(app){
        //场景
        app.get('/products', function(req, res){
            var params = req.query;
            db.select('product', {}, function(result){
                console.log(result);
                res.send(result);
            });
        })

        app.post('/addproduct', function(req, res){
            db.insert('product', req.body, function(result){
                console.log(result);
                res.send({state: true});
            })
        })

        app.post('/deleteproduct', function(req, res){
            var id = req.body.id;
            var objectid = new mongodb.ObjectID.createFromHexString(id);//将字符串转换成一个 objectid
            db.delele('product', {'_id': objectid})
        })
    }
}