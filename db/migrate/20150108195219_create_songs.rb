class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :title
      t.string :recording_id
      
      t.timestamps
    end
  end
end
