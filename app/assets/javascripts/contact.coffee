# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).on 'page:change', ->

  manageButton = ->
    if name.value != '' and objet.value != '' and mail.value != '' and msg.value != ''
      button.removeAttribute 'disabled'
    else
      button.setAttribute 'disabled', true
    return

  clickButton = ->
    sendMail()
    return

  sendMail = ->
      token = document.querySelector('input[name="authenticity_token"]');
      $.ajax(
        method: 'POST'
        url: '/contact/send'
        data:
          authenticity_token: token.value
          name: name.value
          objet: objet.value
          mail: mail.value
          msg: msg.value)
        .done(->
          swal 'Message envoyé !', 'Nous vous répondrons dans les plus bref délais', 'success'
          sweetButton = document.getElementsByClassName('confirm')[0]
          sweetButton.addEventListener 'click', sweetValidate  
          )
        .fail ->
          swal 'Erreur !', 'Le message n\'a pas pu être envoyé !', 'error'
          sweetButton = document.getElementsByClassName('confirm')[0]
          sweetButton.addEventListener 'click', sweetValidate
        return

  sweetValidate = ->
    return

  if window.location.pathname == '/contact'
    name = document.getElementById('name')
    objet = document.getElementById('objet')
    mail = document.getElementById('mail')
    msg = document.getElementById('message')
    button = document.getElementById('send')
    name.addEventListener 'input', manageButton
    objet.addEventListener 'input', manageButton
    mail.addEventListener 'input', manageButton
    msg.addEventListener 'input', manageButton
    button.addEventListener 'click', clickButton

return