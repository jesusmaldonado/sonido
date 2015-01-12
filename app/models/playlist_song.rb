class PlaylistSong < ActiveRecord::Base
  validates :playlist_id, :song_id, presence: true, numericality: true
  validates :playlist_id, uniqueness: { scope: :song_id }
  belongs_to :playlist
  belongs_to :song
end
