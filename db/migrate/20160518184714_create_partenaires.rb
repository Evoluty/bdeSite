class CreatePartenaires < ActiveRecord::Migration
  def change
    create_table :partenaires do |t|
      t.string :nom
      t.string :typePartenaire
      t.string :adresse
      t.string :description
      t.attachment :logo
      
      t.timestamps null: false
    end
  end
end
