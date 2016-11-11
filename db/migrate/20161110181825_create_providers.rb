class CreateProviders < ActiveRecord::Migration
  def change
  	create_table :providers do |t|
  		t.string :name
  		t.string :url
  	end
  end
end
