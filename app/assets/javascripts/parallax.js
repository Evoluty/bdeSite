$(document).ready(function () {
				var b = 1;
		    $('.button-collapse').sideNav();
		    $('.parallax').parallax();
		    $('.dropdown-button').dropdown({
				inDuration: 300,
				outDuration: 225,
				hover: true,
				belowOrigin: true,
				alignment: 'right'
				});
				TableBDE.init();
				TableClub.init();
			  TablePartner.init();
			  TableNews.init();
	$('select').material_select();
	$('select').css('display', 'none');
});