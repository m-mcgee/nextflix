class CreateLists < ActiveRecord::Migration
  def change
  	create_table :lists do |t|
      t.integer :user_id, null: false 
      t.string :name, null: false
      t.text :description, null: false

      t.timestamps(null: false)
    end
  end
end
