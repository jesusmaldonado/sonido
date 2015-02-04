  json.extract!(song, :title, :lyrics, :id)
  json.artist(song.artist)
  json.recording(song.recording)
  json.audio_url asset_path(song.audio_song.url)
