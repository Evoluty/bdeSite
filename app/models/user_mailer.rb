class UserMailer < ActionMailer::Base
	def email()
    recipients    "zaehbnkcdhjjul@yopmail.com"
    from          "test@test.com"
    subject       "subj"
    sent_on       Time.now
    body          {:user => "name", :msg => "message"}
  end
end
