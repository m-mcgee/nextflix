class List < ActiveRecord::Base
  belongs_to :user
  has_many :list_movies
  has_many :movies, through: :list_movies
  has_many :list_followers
  has_many :followers, through: :list_followers, source: :user
end
