class AddDescToAlbums < ActiveRecord::Migration
  def change
    add_column :albums, :description, :text, null: false
  end
end
