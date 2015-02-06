class User < ActiveRecord::Base
  validates :username, :session_token, :password_digest, :email, presence: true, uniqueness: true
  validates :password, length: { in: 6..20, allow_nil: true }
  validates :username, length: { in: 4..20 }
  validates :email, format: { with: /@/, message: "Try rechecking your work, this doesn't look like a valid email" }
  validates :account_type, inclusion: { in: %w(artist listener admin) }

  has_attached_file :avatar, default_url: "empty_user.jpg"
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/


  has_many :song_likes
  has_many :liked_songs, through: :song_likes, source: :song

  has_many :recordings, class_name: "Recording", foreign_key: :artist_id, primary_key: :id
  has_many :playlists

  after_initialize :ensure_session_token

  attr_reader :password

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    (user && user.is_password?(password) ) ? user : nil
  end

  def self.demo_user
    demo_user = User.new(username: Faker::Name.first_name + Faker::Internet.password(6), password: Faker::Internet.password(16), email: Faker::Internet.safe_email + Faker::Internet.password(19), account_type: "artist")
    demo_user.save
    demo_user.playlists.create([{
      title: Faker::Commerce.color + "Playlist"+demo_user.username,
      status: "public"
    }, {
      title: demo_user.username + " 's Private Moments",
      status: "private"
    }])

    demo_user.recordings.create([{
      title: demo_user.username + "'s First" + Faker::Hacker.noun + "Single'",
      recording_type: "album",
      description: "hope you guys like this" + Faker::Hacker.adjective + "song"
    }, {
      title: demo_user.username + "'s Sultry New Album'",
      recording_type: "single",
      description: "hope you guys like this" + Faker::Hacker.adjective + "album"
    }])
    demo_user.recordings.each do |recording|
      recording.songs.create([{
        title: Faker::Hacker.adjective + Faker::Hacker.noun,
        lyrics: Faker::Hacker.verb
        },
        {
        title: "thisisanother song :)",
        lyrics: Faker::Hacker.verb
        }])
      end
    demo_user
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

  def eps
    self.recordings.where(recording_type: "ep").order("created_at DESC")
  end

  def albums
    self.recordings.where(recording_type: "album").order("created_at DESC")
  end

  def singles
    self.recordings.where(recording_type: "single").order("created_at DESC")
  end

  def public_playlists
    self.playlists.where(status: "public").order("created_at DESC")
  end

  def private_playlists
    self.playlists.where(status: "private").order("created_at DESC")
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
