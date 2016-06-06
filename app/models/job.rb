class Job < ActiveRecord::Base
	has_many :members
	validates :M, uniqueness: { case_sensitive: false }
	validates :F, uniqueness: { case_sensitive: false }
end
