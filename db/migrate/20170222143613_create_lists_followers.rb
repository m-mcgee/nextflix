class CreateListsFollowers < ActiveRecord::Migration
  def change
  	create_table :list_followers do |t|
  		t.integer :list_id, null: false
  		t.integer :user_id, null: false

  		t.timestamps(null: false)
  	end
  end
end
