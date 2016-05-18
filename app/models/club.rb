class Club < ActiveRecord::Base
	has_attached_file :image_club, styles: { medium: "300x300>", thumb: "100x100>" }
  	validates_attachment_content_type :image_club, content_type: /\Aimage\/.*\Z/

  	validates :nom, presence: true
	validates :description, presence: true
	validates :president, presence: true
end