class User < ActiveRecord::Base
  has_many :lists
  has_many :users_lists
  has_many :followed_lists, through: :lists_users, source: :list

  has_many :active_relationships,  class_name:  "UserFollower",
                                   foreign_key: "follower_id",
                                   dependent:   :destroy
  has_many :passive_relationships, class_name:  "UserFollower",
                                   foreign_key: "user_id",
                                   dependent:   :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships, source: :follower

  validates :email, presence: true, uniqueness: true 
  validates :username, presence: true, uniqueness: true 

  def password
    @password ||= BCrypt::Password.new(password_hash)
  end

  def password=(new_password)
    @password = BCrypt::Password.create(new_password)
    self.password_hash = @password
  end

  def auth(password)
    self.password == password
  end

  def is_following?(user)
    self.following.include?(user)
  end

 
end
