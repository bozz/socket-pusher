var libpath = require('path'),
    http = require("http").createServer(handler),
    io = require('socket.io').listen(http),
    fs = require('fs'),
    url = require("url"),
    mime = require('mime');

var path = ".";
var port = 8080;


http.listen(port);

function handler(request, response) {
    var uri = url.parse(request.url).pathname;
    var filename = libpath.join(path, uri);
    console.log('filename', filename);

    fs.exists(filename, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                "Content-Type": "text/plain"
            });
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) {
            filename += '/index.html';
        }

        fs.readFile(filename, "binary", function (err, file) {
            if (err) {
                response.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                response.write(err + "\n");
                response.end();
                return;
            }

            var type = mime.lookup(filename);
            response.writeHead(200, {
                "Content-Type": type
            });
            response.write(file, "binary");
            response.end();
        });
    });
}


io.sockets.on('connection', function (socket) {

  setInterval(function(){
    var now = new Date();
    var berlinTime = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    socket.emit('time', { berlin: berlinTime });
  }, 1000);

  socket.on('my other event', function (data) {
    console.log(data);
  });
});
