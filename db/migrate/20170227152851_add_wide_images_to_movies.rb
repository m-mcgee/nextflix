class AddWideImagesToMovies < ActiveRecord::Migration
  def change
  	add_column :movies, :wide_1, :string
  	add_column :movies, :wide_2, :string
  end
end
