/* 
* @Author: 陈文贵
* @Date:   2017-10-19 20:44:40
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-19 22:00:25
*/
//创建服务器  【共享中转站】
var server = require('http').createServer();
//创建io实例
var io = require('socket.io')(server);

//监听客户端连接，并在其中完成主要逻辑代码【中转站】
var allPrice = 1991;
io.on('connection',function(socket){
    //监听前端客服事件，并触发事件给后台客服
    socket.on('sendPrice',function(price){
        allPrice = price;
    });
    socket.on('checkOutLogin',function(){
        io.emit('getPrice',allPrice);
    });
    socket.on('startPrint',function(){
        io.emit('printOrder');
    });
});
server.listen(4144);
console.log('startServer',4144);