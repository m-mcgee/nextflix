class ListUser < ActiveRecord::Base
	belongs_to :list
	belongs_to :user

	validates :list_id, :user_id, presence: true
  validates_uniqueness_of :list_id, :scope => :user_id
end
