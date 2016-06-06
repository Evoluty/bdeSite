class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.string :M
      t.string :F

      t.timestamps null: false
    end
  end
end
