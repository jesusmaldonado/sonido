class CreatePlaylists < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
      t.string :title, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :playlists, :user_id
  end
end
