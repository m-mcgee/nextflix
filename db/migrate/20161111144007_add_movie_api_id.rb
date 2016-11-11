class AddMovieApiId < ActiveRecord::Migration
  def change
    add_column :movies, :guidebox_id, :integer, null: false
  end
end
