# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).on 'page:change', ->
	if window.location.pathname == '/contact'
		name = document.getElementById('name')
		objet = document.getElementById('objet')
		mail = document.getElementById('mail')
		msg = document.getElementById('message')
		button = document.getElementById('send')

		manageButton = () ->
			if name.value != '' and objet.value != '' and mail.value != '' and msg.value != ''
				button.removeAttribute 'disabled'
			else
				button.setAttribute 'disabled', true

		name.addEventListener 'input', manageButton
		objet.addEventListener 'input', manageButton
		mail.addEventListener 'input', manageButton
		msg.addEventListener 'input', manageButton
return
