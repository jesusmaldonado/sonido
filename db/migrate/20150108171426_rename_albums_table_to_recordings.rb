class RenameAlbumsTableToRecordings < ActiveRecord::Migration
  def change
    rename_table(:albums, :recordings)
  end
end
