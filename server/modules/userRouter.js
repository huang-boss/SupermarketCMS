var db = require('../common/dbControl');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended: false});
var apiResult = require('../common/APIresult.js');
var mongodb = require('mongodb');

module.exports = {
    start: function(app){

        app.post("/addUser", urlencode, function(request, response){


            db.select("user", {username: request.body.username}, function(result){
        
                if(!result.status){
                    response.send(apiResult(false, null, 'error'));
                } else if(result.data.length > 0) {
                    response.send(apiResult(false, null, "当前用户已存在"));
                } else {
                    db.insert("user", request.body, function(result){

                        response.send(apiResult(true, request.body, "保存用户信息成功"));
                    })
                }
            })
        });
        //查询全部用户
        app.get('/useAll', function(req, res){
            var params = req.query;
            db.select('user', {}, function(result){
                res.send(result);
            });
        });

        app.post("/checkall", urlencode, function(request, response){
            db.select("user", {}, function(result){
            })
        });

        //删除用户名操作
        app.get('/deleteUser', function(req, res){          
            var id = req.query.id;
            var objectid = new mongodb.ObjectID.createFromHexString(id);//将字符串转换成一个 objectid
            db.delete('user', {'_id': objectid},function(){});
            res.send('删除成功');
        });
    }
}
