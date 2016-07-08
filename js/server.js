var http = require('http');
var app = http.createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var players = [];
var games = {};
var totalQuestions = 25;
app.listen(3000);

function handler (req, res) {
    fs.readFile(__dirname + '/../index.html',
        function (err, data) {
            if (err) {
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
            delete games[players[socket.id].gameId];
            delete players[socket.id];
        }
    });
    socket.on('join lobby', function (data) {
        players[socket.id] = {
            name : data.name
        };
        socket.join('lobby');
        socket.emit('show games', JSON.stringify(games));
    });
    socket.on('start game', function (data) {
        socket.emit('game started', {gameId : data.gameid});
        games[data.gameid] = {players : {player1 : { id: socket.id}}, started : false };
        players[socket.id].gameId = data.gameid;
        socket.join(data.gameid);
    });
    socket.on('join game', function (data) {

        games[data.gameid].players.player2 = { id : socket.id, name : data.name};
        games[data.gameid].players.player1.answers = {};
        games[data.gameid].players.player2.answers = {};
        games[data.gameid].questionCount = 0;
        games[data.gameid].questions = {};
        players[socket.id].gameId = data.gameid;
        socket.join(data.gameid);
        var gamePlayers = {
            player1: players[games[data.gameid].players.player1.id].name,
            player2: players[games[data.gameid].players.player2.id].name
        };
        io.to(data.gameid).emit('both ready', gamePlayers);
    });
    socket.on('load question', function (data) {
            var randomQuestionNumber = randomNumber();
            var question = getJSON(randomQuestionNumber);
            games[data.gameid].questions[games[data.gameid].questionCount] = randomQuestionNumber;
            sendQuestion(io, data.gameid, question, randomQuestionNumber);
    });
    socket.on('send answer', function (data) {
        console.log(games);
        if(games[data.gameid].players.player1.id == socket.id){
            games[data.gameid].players.player1.answers[games[data.gameid].questionCount] = data.answer;
        }
        if(games[data.gameid].players.player2.id == socket.id){
            games[data.gameid].players.player2.answers[games[data.gameid].questionCount] = data.answer;
        }
        if(games[data.gameid].questionCount != 10) {
            var randomQuestionNumber = randomNumber();
            var newQuestion = checkDuplicateQuestion(data.gameid, randomQuestionNumber);
            while (!newQuestion) {
                randomQuestionNumber = randomNumber();
                newQuestion = checkDuplicateQuestion(data.gameid, randomQuestionNumber);
            }
            var question = getJSON(randomQuestionNumber);
            games[data.gameid].questions[games[data.gameid].questionCount] = randomQuestionNumber;
            sendQuestion(io, data.gameid, question, randomQuestionNumber);
        }else{
            io.to(data.gameid).emit('game complete', games[data.gameid]);
        }
    });
});

var getJSON = function(randomQuestion) {
    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync('js/Questions.json', 'utf8'));
    return obj[randomQuestion];
};

function randomNumber(){
    var number = Math.floor((Math.random() * (totalQuestions - 1)) + 1);
    return number;
}

function checkDuplicateQuestion(gameid, newQuestionNumber){
    var newQuestion = true;
    for (var key in games[gameid].questions) {
        // skip loop if the property is from prototype
        if (!games[gameid].questions.hasOwnProperty(key)) continue;

        if(newQuestionNumber == games[gameid].questions[key]){
            newQuestion = false;
        }
    }

    return newQuestion;
}

var sendQuestion = function(io, gameId, question, questionNumber){
    io.to(gameId).emit('send question', question);
    games[gameId].questionCount = games[gameId].questionCount + 1;
    games[gameId].questions[games[gameId].questionCount] = questionNumber;
};