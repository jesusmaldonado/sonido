json.(playlist, :title, :user_id, :status)
json.songs playlist.songs, partial: "api/songs/song", as: :song
