var connect = require('connect');
var dir = ('./public');

var createServer = function(port) {
  connect().use(connect['static'](dir)).listen(port);
  console.log("Server started on " + port);
}

if (require.main === module) {
  createServer(3000);
}

exports.createServer = createServer;
