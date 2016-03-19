# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).on 'page:change', ->
	homescroll = ->
		page = $(this).attr('href').substr(1)
		$('html, body').animate { scrollTop: $(page).offset().top }, 750
		return false

	if window.location.pathname == '/'
		$('.js-scrollTo').on 'click', homescroll
		if window.location.hash
	  		$('html, body').animate { scrollTop: $(window.location.hash).offset().top + 'px' }, 1000, 'swing'
	  		history.replaceState {}, document.title, '/'	
return
