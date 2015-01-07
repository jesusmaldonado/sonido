class User < ActiveRecord::Base
  validates :username, :session_token, :password_digest, :email, presence: true, uniqueness: true
  validates :password, length: { in: 6..20, allow_nil: true }
  validates :username, length: { in: 4..20 }
  validates :email, format: { with: /@/, message: "Try rechecking your work, this doesn't look like a valid email" }
  validates :account_type, inclusion: { in: %w(artist listener admin) }

  after_initialize :ensure_session_token

  attr_reader :password

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    (user && user.is_password?(password) ) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end


  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
