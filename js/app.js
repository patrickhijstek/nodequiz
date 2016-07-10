$(document).ready(function () {
    $("#data").html("<div id='startscherm'></div>\n" +
        "<p id='loading'>Loading</p>"
    );
    $("#data").slideUp(3000, function () {
        loginPage();
    });


    $('.antwoorden').on('click', 'div', function (e) {
        e.preventDefault();
        $('.antwoorden > div').removeClass('selected');

        $(this).addClass('selected');
    });

    //Render timer
    $(".meter > span").each(function () {
        $(this)
            .data("origWidth", $(this).width())
            .width(0)
            .animate({
                width: $(this).data("origWidth") // or + "%" if fluid
            }, 10000);
    });
});


$( document ).ready(function() {
	$("#data").html("<div id='startscherm'></div>\n" +
		"<p id='loading'>Loading</p>"
	);
	$("#data").slideUp(3000,function(){
		loginPage();
	});

$('.antwoorden').on('click', 'div', function(event) {
    $('.antwoorden > div').removeClass('selected');
    $(this).addClass('selected');
});

});

function ButtonDataSchool(target){
  $('div'+target).toggle("slow");
}


function loginPage(){
    //Render login page
    $.get( "http://localhost/proxy.php?url=http://localhost/login.html", function(data) {
        $('main').html(data);
        $('main').show();
    })
        .fail(function () {
            alert("error");
        });
}


function lobbyPage() {
    //Render lobby page
    $.get("http://localhost/proxy.php?url=http://localhost/lobby.html", function (data) {
        $('main').html(data);
    })
        .fail(function () {
            alert("error");
        });
}

function nieuwSpel(playerName) {
    //Render new game html
    $.get("http://localhost/proxy.php?url=http://localhost/spel.html", function (data) {
        $('main').html(data);
        $('.speler1').text(playerName);
    })
        .fail(function () {
            alert("error");
        });
}

function joinSpel(player1Name, player2Name) {
    //Render start game html
    $.get("http://localhost/proxy.php?url=http://localhost/spel.html", function (data) {
        $('main').html(data);
        $('.speler1').text(player1Name);
        $('.speler2').text(player2Name);
    })
        .fail(function () {
            alert("error");
        });
}
function uitslagPage(results) {
    $.get("http://localhost/proxy.php?url=http://localhost/uitslag.html", function (data) {
        //Render results html
        $('main').html(data);
        var player1Score = 0;
        var player2Score = 0;
        var resultRow;
        for( var i = 1; i <= results.questionCount; i++){
            resultRow = '';

            resultRow += '<tr>' ;
            resultRow += '<th>Vraag ';
            resultRow += i;
            resultRow += '</th>';

            switch(results.players.player1.answers[i]){
                case true:
                    resultRow += '<td class="goed">&#9745;</td>';
                    player1Score++;
                    break;
                case false:
                    resultRow += '<td class="fout">&#9746;</td>';
                    break;
                default :
                    resultRow += '<td class="nb">&#9744;</td>';
                    break;
            }
            resultRow += '</td>';
            switch(results.players.player2.answers[i]){
                case true:
                    resultRow += '<td class="goed">&#9745;</td>';
                    player2Score++;
                    break;
                case false:
                    resultRow += '<td class="fout">&#9746;</td>';
                    break;
                default :
                    resultRow += '<td class="nb">&#9744;</td>';
                    break;
            }
            resultRow += '</td>';
            resultRow += '</tr>';

            $('.result-table').append(
                resultRow
            );
        }

        //Render scores
        resultRow = '';
        resultRow += '<tr>';
        resultRow += '<th>Uitslag</th>';
        resultRow += '<td>' + player1Score + '</td>';
        resultRow += '<td>' + player2Score + '</td>';
        resultRow += '</tr>';
        $('.result-table').append(
            resultRow
        );

        //Render names
        $('.result-table .player-1-name').text(results.players.player1.name);
        $('.result-table .player-2-name').text(results.players.player2.name);
    })
        .fail(function () {
            alert("error");
        });
}
