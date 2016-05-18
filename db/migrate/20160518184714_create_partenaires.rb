class CreatePartenaires < ActiveRecord::Migration
  def change
    create_table :partenaires do |t|
      t.string :nom
      t.string :typePartenaire
      t.string :adresse
      t.string :description
      t.timestamps null: false
    end
  end
end
