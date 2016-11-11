class CreateListsUsers < ActiveRecord::Migration
  def change
  	create_table :lists_users do |t|
  		t.integer :list_id, null: false
  		t.integer :user_id, null: false
  	end
  end
end
