class CreateMembers < ActiveRecord::Migration
  def change
    create_table :members do |t|
      t.string :firstName
      t.string :name 
      t.string :email
      t.string :password_digest 
      t.string :job
      t.string :role
      t.string :photo
      t.timestamps null: false
    end
  end
end
