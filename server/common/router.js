/* 
* @Author: 陈文贵
* @Date:   2017-10-17 15:46:39
*/

var express = require('express');

var uesrRouter = require("../modules/user");

var productRouter = require('../modules/product');

var saleRouter = require('../modules/sale');

var purchaseRouter = require('../modules/purchaseRouter');


var uesrRouter2 = require('../modules/userRouter');


var app = express();
// var http = require('http');
// var server = http.createServer(app);
// require('../modules/io_server')(server);
app.use(express.static('../src'));
module.exports ={
    start: function(port){
        app.all('*', function(req, res, next) {
            // res.writeHead(200, {"Content-Type"})
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By",' 3.2.1')
            if(req.method=="OPTIONS") {
                res.sendStatus(200);/*让options请求快速返回*/
            } else{
                next();
            }
        });
        productRouter.Register(app);
        saleRouter.Register(app);
        purchaseRouter.Register(app);
        uesrRouter.Register(app); 
        uesrRouter2.start(app);

        
        app.listen(port);   
    }
}