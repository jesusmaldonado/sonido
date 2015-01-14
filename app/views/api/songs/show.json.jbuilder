json.extract! @song, :artist, :recording, :title, :created_at, :id
json.liked @song.liked?(current_user)
