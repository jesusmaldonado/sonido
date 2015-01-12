class SongLike < ActiveRecord::Base
  validates :user_id, :song_id, presence: true, numericality: true
  validates :user_id, uniqueness: { scope: :song_id }
  belongs_to :user
  belongs_to :song
end
