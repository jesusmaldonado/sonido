json.extract! @song, :artist, :recording, :title, :created_at, :id
json.audio_url asset_path(@song.audio_song.url)
json.liked @song.liked?(current_user)
json.audio_song @song.audio_song
