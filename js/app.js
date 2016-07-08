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


$( document ).ready(function() {
	$("#data").html("<div id='startscherm'></div>\n" +
		"<p id='loading'>Loading</p>"
	);
	$("#data").slideUp(3000,function(){
		loginPage();
	});

$('.antwoorden').on('click', 'div', function(event) {
      $('.antwoorden > div').removeClass('selected');
      console.log( $(this).value);
      $(this).addClass('selected');
    });

});

function ButtonDataSchool(target){
  $('div'+target).toggle("slow");
}


function loginPage(){
    $.get( "http://localhost/proxy.php?url=http://localhost/login.html", function(data) {
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
