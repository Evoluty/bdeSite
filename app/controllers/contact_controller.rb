class ContactController < ApplicationController
  def index
  	@title = "Contact"
  end

  def sendMail
  	name = params[:name]
  	mail = params[:mail]
  	objet = params[:objet]
  	msg = params[:msg]
  	
  	render :nothing => true
  end
end
