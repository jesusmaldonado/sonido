json.(recording, :title, :artist, :created_at, :updated_at, :description, :recording_type, :id)
json.songs recording.songs, partial: "api/songs/song", as: :song
