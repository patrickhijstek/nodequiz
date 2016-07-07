// variables to save some scores
var questionsPlayer1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var questionsPlayer2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

$(document).ready(function () {
    $("#data").html("<div id='startscherm'></div>\n" +
        "<p id='loading'>Loading</p>"
    );
    $("#data").slideUp(3000, function () {
        loginPage();
    });


    $('.antwoorden').on('click', 'div', function (event) {
        event.preventDefault();
        $('.antwoorden > div').removeClass('selected');

        $(this).addClass('selected');
    });


    $(".meter > span").each(function () {
        $(this)
            .data("origWidth", $(this).width())
            .width(0)
            .animate({
                width: $(this).data("origWidth") // or + "%" if fluid
            }, 10000);
    });
});

function loginPage() {
    $.get("http://localhost/proxy.php?url=http://localhost/login.html", function (data) {


        $('main').html(data);
        $('main').show();
    })
        .fail(function () {
            alert("error");
        });
}


function lobbyPage() {
    $.get("http://localhost/proxy.php?url=http://localhost/lobby.html", function (data) {

        $('main').html(data);

    })
        .fail(function () {
            alert("error");
        });
}

function nieuwSpel(playerName) {
    $.get("http://localhost/proxy.php?url=http://localhost/spel.html", function (data) {
        $('main').html(data);
        $('.speler1').text(playerName);
    })
        .fail(function () {
            alert("error");
        });
}

function joinSpel(player1Name, player2Name) {
    $.get("http://localhost/proxy.php?url=http://localhost/spel.html", function (data) {
        $('main').html(data);
        $('.speler1').text(player1Name);
        $('.speler2').text(player2Name);
    })
        .fail(function () {
            alert("error");
        });
}
function uitslagPage() {
    $.get("http://localhost/proxy.php?url=http://localhost/uitslag.html", function (data) {
        $('main').html(data);
    })
        .fail(function () {
            alert("error");
        });
}

//
//// reads json file that contains questions
//$(document).ready(function () {
//    loadQuestion();
//    $.getJSON(questions.json, function (result) {
//        $result = result;
//    })
//});
//
//function compareAnswers() {
//    // compare given answers
//}
//
//// saves score for player 1
//function saveAnswerPlayer1(question, correct) {
//    question--; // because the index starts at 0, so question 1 would be 0.
//    if (correct === true) {
//        questionsPlayer1[question] = 1;
//    }
//}
//// saves score for player 2
//function saveAnswerPlayer2(question, correct) {
//    question--; // because the index starts at 0, so question 1 would be 0.
//    if (correct === true) {
//        questionsPlayer2[question] = 1;
//    }
//}
//
////checks who won the match
//function whoHasWon() {
//    // for counting the values
//    var player1;
//    var player2;
//
//    // loops over array to add values
//    questionsPlayer1.forEach(function (value) {
//        player1 = player1 + value;
//    })
//    // loops over array to add values
//    questionsPlayer2.forEach(function (value) {
//        player2 = player2 + value;
//    })
//
//    if (player1 > player2) {
//        return 1;
//    }
//    if (player2 > player1) {
//        return 2;
//    }
//    // equal match
//    return 0;
//
//
//}