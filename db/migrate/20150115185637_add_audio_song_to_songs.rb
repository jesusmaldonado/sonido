class AddAudioSongToSongs < ActiveRecord::Migration
   def self.up
    add_attachment :songs, :audio_song
  end

  def self.down
    remove_attachment :songs, :audio_song
  end
end
