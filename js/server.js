var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
global.players = [];
app.listen(3000);

function handler (req, res) {
    fs.readFile(__dirname + '/../index.html',
        function (err, data) {
            if (err) {
                console.log(err);
                res.writeHead(500);
                return res.end('Error loading index.html');
            }

            res.writeHead(200);
            res.end(data);
        });
}

var nsp = io.of('/lobby');
io.on('connection', function (socket) {
    socket.on('disconnect', function () {
        delete global.players[socket.id];
    });
    socket.on('join lobby', function (data) {
        global.players[socket.id] = {
            name : data.name
        };
    });
});

