json.(user, :id, :username, :email, :account_type)
json.playlists user.playlists, partial: "api/playlists/playlist", as: :playlist
json.recordings user.recordings, partial: "api/recordings/recording", as: :recording
json.likes user.liked_songs, partial: "api/songs/song", as: :song
