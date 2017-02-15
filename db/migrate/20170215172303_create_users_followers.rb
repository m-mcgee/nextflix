class CreateUsersFollowers < ActiveRecord::Migration
  def change
    	create_table :user_followers do |t|
  		t.integer :user_id, null: false
  		t.integer :follower_id, null: false
  	end
  end
end
