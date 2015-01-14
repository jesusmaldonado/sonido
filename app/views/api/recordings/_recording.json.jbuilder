json.(recording, :title, :artist, :created_at, :updated_at, :description, :recording_type)
json.songs recording.songs, partial: "api/songs/song", as: :song
