class AddImageToRecordings < ActiveRecord::Migration
  def self.up
   add_attachment :recordings, :image
  end

  def self.down
   remove_attachment :recordings, :image
  end
end
