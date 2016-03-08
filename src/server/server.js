var http = require("http");
var url = require("url");

function startServer(app) {
    var server = app.listen(app.get('port'), function () {
    
      var host = server.address().address
      var port = server.address().port
    
      console.log('App listening at http://%s:%s', host, port)
    
    })
}

exports.start = startServer; 