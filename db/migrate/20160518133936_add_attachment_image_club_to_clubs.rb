class AddAttachmentImageClubToClubs < ActiveRecord::Migration
  def self.up
    change_table :clubs do |t|
      t.attachment :image_club
    end
  end

  def self.down
    remove_attachment :clubs, :image_club
  end
end
