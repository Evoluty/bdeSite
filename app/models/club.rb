class Club < ActiveRecord::Base
	has_attached_file :image_club, styles: { medium: "300x300>", thumb: "75x75>" }, default_url: "assets/clubs/club.jpg"
  	validates_attachment :image_club, presence:true, content_type: {content_type: ["image/jpeg", "image/png"]}, size: { in: 0..500.kilobytes}

  	validates :nom, presence: true
	validates :description, presence: true
	validates :president, presence: true
end