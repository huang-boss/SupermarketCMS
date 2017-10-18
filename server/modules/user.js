/* 
* @Author: 陈文贵
* @Date:   2017-10-18 11:14:59
*/

var bodyParser = require('body-parser');
var url = require('url');
var jwt = require('jsonwebtoken');//用来创建和确认用户信息摘要

module.exports = {
    Register: function(app){
        app.use(bodyParser.urlencoded({extended: false}));

        //过滤器
        // app.use(function(req, res, next){
        //  if(!req.session.name && url.parse(req.url).pathname != "/login"){
        //      next('{state: false, message: "当前没有权限访问"}');
        //  } else {
        //      next();
        //  }
        //  //你可以执行下一步操作
            
        // })

        app.post('/login', function(req, res){
            var uesr = {
                username: req.body.username,
            }

            var token = jwt.sign(user, 'secret', {
                'expiresIn': 1440 // 设置过期时间
            })

            res.send({state: true, token: token});

            // jwt.verify(token, 'secret', function(error, result){
            //  if(error){
            //      res.send({status: false, message: error});
            //  } else {
            //      res.send({status: true});
            //  }
            // })           
        })
    }
}