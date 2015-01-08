class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :title, null: false
      t.integer :recording_id, null: false
      t.integer :play_count, null: false
      t.string :duration, null: false
      t.text :lyrics, null: false
      t.timestamps
    end
    add_index :songs, :title
    add_index :songs, :play_count
    add_index :songs, :recording_id
  end
end
