class ListMovie < ActiveRecord::Base
	belongs_to :list
	belongs_to :movie

	validates :list_id, :movie_id, presence: true
end
