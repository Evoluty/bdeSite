class CreateMembers < ActiveRecord::Migration
  def change
    create_table :members do |t|
      t.string :firstname
      t.string :name 
      t.string :sexe
      t.string :email
      t.string :password_digest 
      t.belongs_to :role, index: true
      t.belongs_to :job, index: true
      t.attachment :photo

      t.timestamps null: false
    end
  end
end
