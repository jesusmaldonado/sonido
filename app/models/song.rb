class Song < ActiveRecord::Base
  validates :title, :recording_id, :lyrics, presence: true
  # validates :duration, format: { with: /[0-5][0-9] minutes [0-9][0-9] seconds/, message: "Only songs up to an hour long can be uploaded" }

  belongs_to :recording
  has_one :artist, through: :recording, source: :artist



end
