var express = require('express'); 
var server = express();

server.configure(
	function(){
  		//server.use('/static', express.static(__dirname + '/static'));
  		server.use(express.static(__dirname + '/'));
});

server.listen(8000);