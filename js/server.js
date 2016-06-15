var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var players = [];
var games = {};
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

io.on('connection', function (socket) {
    socket.on('disconnect', function () {
        if(players[socket.id]){
            //delete games[players[socket.id].gameId];
            delete players[socket.id];
        }
    });
    socket.on('join lobby', function (data) {
        players[socket.id] = {
            name : data.name
        };
        socket.join('lobby');
        console.log(games);
        socket.emit('show games', JSON.stringify(games));

    });
    socket.on('start game', function (data) {
        var gameId = 'game-' + socket.id;
        console.log(gameId);
        socket.emit('game started', {gameId : gameId});

        games[gameId] = {players : {player1 : socket.id}, started : false };
        console.log(games);
        players[socket.id].gameId = gameId;
        socket.join('game-' + gameId);
    });


});