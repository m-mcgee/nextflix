class ListUser < ActiveRecord::Base
	belongs_to :list
	belongs_to :user

	validates :list_id, :user_id, presence: true
end
