class Member < ActiveRecord::Base
	has_secure_password

	has_attached_file :photo, styles: { medium: "300x300>", thumb: "75x75>" }
  	validates_attachment :photo, content_type: {content_type: ["image/jpeg", "image/png"]}, size: { in: 0..500.kilobytes}

	EMAIL_REGEX =  /\b[A-Z0-9._%a-z\-]+@(?:[A-Z0-9a-z\-]+\.)+[A-Za-z]{2,4}\z/
	validates :name, :presence => true, :length => { :in => 3..20 }
	validates :firstname, :presence => true, :length => { :in => 3..20 }
	validates :email, :presence => true, :uniqueness => true, :format => EMAIL_REGEX
	validates :password, :confirmation => true
	validates_length_of :password, :in => 6..40, :on => :create
end
