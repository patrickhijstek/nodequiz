$( document ).ready(function() {
	$("#data").html("<div id='startscherm'></div>\n" +
		"<p id='loading'>Loading</p>"
	);
	$("#data").slideUp(3000,function(){
		loginPage();
	});



  $('.antwoorden').on('click', 'div', function(event) {
  		event.preventDefault();
  		$('.antwoorden > div').removeClass('selected');
  		
  		$(this).addClass('selected');
  	});

  $("#setPlayer").on("click", "input:submit", function(){
    alert("form has been submitted.");
    return false;
});


	$(".meter > span").each(function() {
  $(this)
    .data("origWidth", $(this).width())
    .width(0)
    .animate({
    	width: $(this).data("origWidth") // or + "%" if fluid
    	}, 10000);
	});
});

function loginPage(){
html = $.get( "login.html", function() {
  $('main').html(html.responseText);
$('main').show();
})
  .fail(function() {
    alert( "error" );
  }); 
}


function lobbyPage(){
 html = $.get( "lobby.html", function() {
  console.log(html.responseText);
  $('main').html(html.responseText);

})
  .fail(function() {
    alert( "error" );
  }); 
}

function NieuwSpel(){
 html = $.get( "spel.html", function() {
   $('main').html(html.responseText);
})
  .fail(function() {
    alert( "error" );
  }); 
}

function JoinSpel(id){
 html = $.get( "spel.html", function() {
  alert("spel id = " + id);
  $('main').html(html.responseText);

})
  .fail(function() {
    alert( "error" );
  }); 
}
function uitslagPage(){
  html = $.get( "uitslag.html", function() {
  $('main').html(html.responseText);
  })
    .fail(function() {
      alert( "error" );
    }); 
}