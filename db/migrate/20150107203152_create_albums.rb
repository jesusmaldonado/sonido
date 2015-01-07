class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.integer :artist_id, null: false
      t.string :type, null: false
      t.string :title, null: false

      t.timestamps
    end
  end
end
