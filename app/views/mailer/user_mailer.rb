class UserMailer < ActionMailer::Base

	def deliver_email(mail, name, subj, msg)
	mail(
		to: 		'zaehbnkcdhjjul@yopmail.com',
		from: 		mail,		
		subject: 	"Formulaire web :" + " de : " + name + " | " + subj,
		body: 		msg,
		content_type: "text/html"
	)
	end


end
