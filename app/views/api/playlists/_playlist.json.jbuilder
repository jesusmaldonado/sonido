json.(playlist, :title, :user_id, :status, :id)
json.songs playlist.songs, partial: "api/songs/song", as: :song
