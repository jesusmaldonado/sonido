class Recording < ActiveRecord::Base
  validates :artist_id, :recording_type, :title, presence: true
  validates :artist_id, numericality: true
  validates :title, uniqueness: { scope: :artist_id, message: "You already have this name for another recording"}
  validates :recording_type, inclusion: { in: %w( album ep single ) }
  belongs_to :artist, class_name: "User", foreign_key: :artist_id
  has_many :songs
end
