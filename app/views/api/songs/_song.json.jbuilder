  json.extract!(song, :title, :lyrics, :id)
  json.artist(song.artist)
  json.recording(song.recording)
