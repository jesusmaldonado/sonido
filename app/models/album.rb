class Album < ActiveRecord::Base
  validates :artist_id, :type, :title, presence: true
  validates :artist_id, numericality: true
  validates :title, uniqueness: { scope: :artist_id, message: "You already have this name for another resource"}
  validates :type, inclusion: { in: %w( album ep single ) }
end
