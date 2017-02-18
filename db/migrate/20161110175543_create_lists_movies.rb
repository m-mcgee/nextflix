class CreateListsMovies < ActiveRecord::Migration
  def change
  	create_table :list_movies do |t|
  		t.integer :list_id, null: false
  		t.integer :movie_id, null: false

  		t.timestamps(null: false)
  	end
  end
end
