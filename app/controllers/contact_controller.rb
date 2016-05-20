class ContactController < ApplicationController
  require 'uri'
  require 'net/http'
  def index
  	@title = "Contact"
  end

  def sendMail
    captcha = params[:captcha]
    name = params[:name]
    mail = params[:mail]
    objet = params[:objet]
    msg = params[:msg]
    params = {'secret' => '6LeYeSATAAAAAP18IT1Ba3vPUwdlHlg25D4EUdIa',
    'response' => captcha
    }
    x = Net::HTTP.post_form(URI.parse('https://www.google.com/recaptcha/api/siteverify'), params)
    data = x.body
    if (data['success'])
    	mg_client = Mailgun::Client.new
      message_params =  { from: name + ' <' + mail + '>',
                          to:   'brice.miclo@gmail.com',
                          subject: objet,
                          text:    msg
                       }
      # Send your message through the client
      mg_client.send_message('sandboxe99124c6b3c04303a5ba2479dac8a17c.mailgun.org', message_params)
    else
      puts "erreur"
    end
  	render :nothing => true
  end
end
