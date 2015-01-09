class RemovePlayCountFromCreateSongs < ActiveRecord::Migration
  def change
    remove_column :songs, :play_count
  end
end
