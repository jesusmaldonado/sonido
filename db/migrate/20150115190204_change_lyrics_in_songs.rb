class ChangeLyricsInSongs < ActiveRecord::Migration
  def change
    change_column :songs, :lyrics, :text, null: true
  end
end
