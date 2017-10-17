var PurchaseRouter = require('./PurchaseRouter.js');

module.exports = {
	purchase: function(express){
		var app = express();
		app.all('*', function(req, res, next) {
		    // res.writeHead(200, {"Content-Type"})
		    res.header("Access-Control-Allow-Origin", "*");
		    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
		    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		    res.header("X-Powered-By",' 3.2.1')
		    if(req.method=="OPTIONS") {
		      res.send(200);/*让options请求快速返回*/
		    } else{
		      next();
		    }
		});
		app.listen(1234);
		
		app.use(express.static(__dirname + '/'));

		PurchaseRouter.purchase(app);
	}
}