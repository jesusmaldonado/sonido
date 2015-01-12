class CreateSongLikes < ActiveRecord::Migration
  def change
    create_table :song_likes do |t|
      t.integer :song_id, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :song_likes, :song_id
    add_index :song_likes, :user_id
  end
end
