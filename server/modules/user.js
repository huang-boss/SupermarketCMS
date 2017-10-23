/* 
* @Author: 陈文贵
* @Date:   2017-10-18 11:14:59
*/
var db = require('../common/dbControl');
var mongodb = require('mongodb');

module.exports = {
    Register: function(app){
       app.get('/login', function(req, res){
            db.select('user', {'username':req.query.username,'password':req.query.password,'size':req.query.size}, function(result){
                res.send(result);
            });
        })
    }
}