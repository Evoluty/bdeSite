# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).on 'page:change', ->

  hasClass = (elem, cls) ->
    return (" " + elem.className + " ").indexOf(" " + cls + " ") > -1;

  manageButton = ->
    if name.value != '' and objet.value != '' and mail.value != '' and msg.value != ''
      button.removeAttribute 'disabled'
    else
      button.setAttribute 'disabled', true
    return

  clickButton = ->
    if name.value != "" && mail.value != "" && objet.value != "" && msg.value != ""
      if hasClass(mail, "invalid")
        swal 'Erreur !', 'Veuillez entrer une adresse mail valide !', 'error'
        sweetButton = document.getElementsByClassName('confirm')[0]
      else
        sendMail()
    else 
      swal 'Erreur !', 'Veuillez remplir tous les champs !', 'error'
      sweetButton = document.getElementsByClassName('confirm')[0]
    return

  sendMail = ->
      token = document.querySelector('input[name="authenticity_token"]')
      captcha = document.getElementById('g-recaptcha-response')
      if captcha and captcha.value != ''
        captcha_value = captcha.value
        $.ajax(
          method: 'POST'
          url: '/contact/send'
          data:
            authenticity_token: token.value
            captcha: captcha_value
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
      else
        swal 'Erreur !', 'Veuillez remplir le captcha !', 'error'
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