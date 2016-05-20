class ContactController < ApplicationController
  def index
  	@title = "Contact"
  end

  def sendMail
    captcha = params[:captcha]
    if (verify_recaptcha(response: captcha))
    	name = params[:name]
    	mail = params[:mail]
    	objet = params[:objet]
    	msg = params[:msg]
    	mg_client = Mailgun::Client.new
      message_params =  { from: name + ' <' + mail + '>',
                          to:   'brice.miclo@gmail.com',
                          subject: objet,
                          text:    msg
                       }
      # Send your message through the client
      mg_client.send_message('sandboxe99124c6b3c04303a5ba2479dac8a17c.mailgun.org', message_params)
    end
  	render :nothing => true
  end
end
