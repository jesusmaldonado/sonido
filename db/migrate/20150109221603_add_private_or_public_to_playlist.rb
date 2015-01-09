class AddPrivateOrPublicToPlaylist < ActiveRecord::Migration
  def change
    add_column :playlists, :status, :string
  end
end
