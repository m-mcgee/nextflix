class CreateMovies < ActiveRecord::Migration
  def change
  	create_table :movies do |t|
	  	t.string :title, null: false
	  	t.string :year, null: false
	  	t.string :genre, null: false
	  	t.text :overview, null: false
	  	t.string :img_url

      t.timestamps(null: false)
	  end
  end
end
