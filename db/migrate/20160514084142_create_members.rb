class CreateMembers < ActiveRecord::Migration
  def change
    create_table :members do |t|
      t.string :firstname
      t.string :name 
      t.string :email
      t.string :password_digest 
      t.string :job
      t.string :role
      t.timestamps null: false
    end
  end
end
