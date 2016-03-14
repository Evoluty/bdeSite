$(document).ready(function () {
	(function($){
	  $(function(){

	    $('.button-collapse').sideNav();
	    $('.parallax').parallax();
	    $('.dropdown-button').dropdown({
			inDuration: 300,
			outDuration: 225,
			hover: true,
			belowOrigin: true,
			alignment: 'right'
		});

	  }); // end of document ready
	})(jQuery); // end of jQuery name space
});
