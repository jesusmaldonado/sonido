  json.extract!(song, :title, :lyrics, :id)
  json.artist(song.artist)
  json.recording(song.recording)
  if current_user
    json.liked(song.liked?(current_user))
  end
  json.playlists song.playlists, partial: "api/songs/playlistsong", as: :playlist
  json.audio_url asset_path(song.audio_song.url)
