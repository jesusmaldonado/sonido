class Playlist < ActiveRecord::Base
    validates :title, :user_id, :status, presence: true
    validates :title, uniqueness: { scope: :user_id, message: "You already have a playlist with this name"}
    validates :status, inclusion: { in: %w( private public) }
    belongs_to :user
    has_many :playlist_songs
    has_many :songs, through: :playlist_songs, source: :song
end
