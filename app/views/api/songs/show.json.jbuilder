json.extract! @song, :artist, :recording, :title, :created_at, :id
json.liked @song.liked?(current_user)
json.song_like @song.song_like(current_user)
