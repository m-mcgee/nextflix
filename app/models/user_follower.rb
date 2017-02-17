class UserFollower < ActiveRecord::Base
	belongs_to :followed, class_name: 'User', foreign_key: :user_id
	belongs_to :follower, class_name: 'User', foreign_key: :follower_id

	validates :user_id, uniqueness: {scope: :follower_id}
end
