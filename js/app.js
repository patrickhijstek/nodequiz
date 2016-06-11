$( document ).ready(function() {
	$("#data").html("<div id='startscherm'></div>\n" +
		"<p id='loading'>Loading</p>"
	);
	$("#data").slideUp(3000,function(){
		loginPage();
	});


	function loginPage(){

	$("#data").load("../login.html #nav1div");
	//$("#data").show();
}
	
});