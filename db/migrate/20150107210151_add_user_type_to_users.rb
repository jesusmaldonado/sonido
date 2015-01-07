class AddUserTypeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :account_type, :string, null: false
    add_index :users, :account_type
  end
end
