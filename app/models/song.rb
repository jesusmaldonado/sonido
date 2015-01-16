class Song < ActiveRecord::Base
  validates :title, :recording_id, :lyrics, presence: true
  # validates :duration, format: { with: /[0-5][0-9] minutes [0-9][0-9] seconds/, message: "Only songs up to an hour long can be uploaded" }
  has_attached_file :audio_song
  validates_attachment_content_type :audio_song, :content_type => /\Aaudio\/.*\Z/


  belongs_to :recording
  has_one :artist, through: :recording, source: :artist
  has_many :playlist_songs
  has_many :playlists, through: :playlist_songs, source: :playlist
  def song_like(user)
    SongLike.find_by(user_id: user.id, song_id: self.id)
  end

  def liked?(user)
    if SongLike.find_by(user_id: user.id, song_id: self.id)
      return "liked"
    else
      return "notliked"
    end
  end

end
