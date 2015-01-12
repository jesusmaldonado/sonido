class PlaylistSong < ActiveRecord::Base
  validates :playlist_id, :song_id, presence: true, numericality: true
  
  belongs_to :song
  belongs_to :playlist

end
