class List < ActiveRecord::Base
  belongs_to :user
  has_many :list_movies
  has_many :movies, through: :list_movies
  has_many :followers, through: :lists_users, source: :user
end
