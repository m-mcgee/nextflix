class User < ActiveRecord::Base
  has_many :lists
  has_many :users_lists
  has_many :followed_lists, through: :lists_users, source: :list

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

end
