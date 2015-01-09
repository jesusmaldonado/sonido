# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150108225334) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "recordings", force: true do |t|
    t.integer  "artist_id",      null: false
    t.string   "recording_type", null: false
    t.string   "title",          null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "description",    null: false
  end

  create_table "songs", force: true do |t|
    t.string   "title",        null: false
    t.integer  "recording_id", null: false
    t.text     "lyrics",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "songs", ["recording_id"], name: "index_songs_on_recording_id", using: :btree
  add_index "songs", ["title"], name: "index_songs_on_title", using: :btree

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.string   "email",           null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "account_type",    null: false
  end

  add_index "users", ["account_type"], name: "index_users_on_account_type", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
