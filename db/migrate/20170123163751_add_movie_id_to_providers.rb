class AddMovieIdToProviders < ActiveRecord::Migration
  def change
  	add_column :providers, :movie_id, :integer, null: false
  end
end
