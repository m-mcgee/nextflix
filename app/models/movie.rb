class Movie < ActiveRecord::Base
  has_many :list_movies
  has_many :lists, through: :list_movies
  has_many :providers

  validates :title, :year, :overview, :guidebox_id, presence: true
end
