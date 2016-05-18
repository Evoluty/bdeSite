class CreateClubs < ActiveRecord::Migration
  def change
    create_table :clubs do |t|
      t.string :nom
      t.text :description
      t.string :image
      t.attachment :image_club
      
      t.timestamps null: false
    end
  end
end
