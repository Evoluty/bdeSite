class Partenaire < ActiveRecord::Base
	has_attached_file :logo, styles: { medium: "300x300>", thumb: "75x75>" }
  	validates_attachment :logo, content_type: {content_type: ["image/jpeg", "image/png"]}, size: { in: 0..500.kilobytes}

  	validates :nom, presence: true
  	validates :typePartenaire, presence: true
  	validates :description, presence: true
end
