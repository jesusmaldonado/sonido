json.extract! @song, :artist, :recording, :title, :upload_time, :id
json.audio_url asset_path(@song.audio_song.url)
if current_user
  json.liked(@song.liked?(current_user))
end
