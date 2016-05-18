class Member < ActiveRecord::Base
	has_secure_password
	EMAIL_REGEX =  /\b[A-Z0-9._%a-z\-]+@(?:[A-Z0-9a-z\-]+\.)+[A-Za-z]{2,4}\z/
	#validates :firstName, :presence => true, :length => { :in => 3..20 }
	validates :email, :presence => true, :uniqueness => true, :format => EMAIL_REGEX
	#validates :password, :confirmation => true
	#validates_length_of :password, :in => 6..40, :on => :create
end
