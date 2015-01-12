class Song < ActiveRecord::Base
  validates :title, :recording_id, :lyrics, presence: true
  # validates :duration, format: { with: /[0-5][0-9] minutes [0-9][0-9] seconds/, message: "Only songs up to an hour long can be uploaded" }

  belongs_to :recording
  has_one :artist, through: :recording, source: :artist

  def song_like(user)
    SongLike.find_by(user_id: user.id, song_id: self.id)
  end

  def liked?(user)
    if SongLike.find_by(user_id: user.id, song_id: self.id)
      return true
    else
      return false
    end
  end

end
