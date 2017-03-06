class ChangeUserToFbAuth < ActiveRecord::Migration
  def change
  	remove_column :users, :password_hash
  	add_column :users, :fb_id, :string
  	add_column :users, :img, :string
  end
end
