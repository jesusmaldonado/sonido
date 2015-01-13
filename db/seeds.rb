# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or create!d alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create!([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create!(name: 'Emanuel', city: cities.first)

  user1 = User.create!(username: "kono", email: "kono@", password: "konoko", account_type: "artist")
  user2 = User.create!(username: "kono1", email: "kono1@", password: "konoko1", account_type: "artist")
  user3 = User.create!(username: "kono2", email: "kono2@", password: "konoko2", account_type: "listener")
  user4 = User.create!(username: "kono3", email: "kono3@", password: "konoko3", account_type: "listener")
  user5 = User.create!(username: "kono4", email: "kono4@", password: "konoko4", account_type: "listener")

  record1 = user3.recordings.create!(artist_id: user3.id, title: "user3 recording", recording_type: "album", description: "user3description")
  record2 = user3.recordings.create!(artist_id: user3.id, title: "user3 recording1", recording_type: "ep", description: "user3description1")
  record3 = user3.recordings.create!(artist_id: user3.id, title: "user3 recording2", recording_type: "single", description: "user3description2")


  song1 = record1.songs.create!(title: "record1song1", lyrics: "lalala1")
  song2 = record1.songs.create!(title: "record1song2", lyrics: "lalala2")
  song3 = record1.songs.create!(title: "record1song3", lyrics: "lalala3")
  song4 = record1.songs.create!(title: "record1song4", lyrics: "lalala4")
  song5 = record1.songs.create!(title: "record1song5", lyrics: "lalala5")
  song6 = record1.songs.create!(title: "record1song6", lyrics: "lalala6")
  song7 = record1.songs.create!(title: "record1song7", lyrics: "lalala7")

  user2.song_likes.create!(song_id: song1.id)
  user2.song_likes.create!(song_id: song2.id)
  user2.song_likes.create!(song_id: song3.id)
  user2.song_likes.create!(song_id: song4.id)
  user2.song_likes.create!(song_id: song5.id)
  user2.song_likes.create!(song_id: song6.id)
  user2.song_likes.create!(song_id: song7.id)

  playlist1 = user2.playlists.create!(title: "playlist1", status: "public")
  playlist2 = user2.playlists.create!(title: "playlist2", status: "public")
  playlist3 = user2.playlists.create!(title: "playlist3", status: "private")


  playlist1.songs << (song1)
  playlist1.songs << (song2)
  playlist1.songs << (song3)

  playlist2.songs << (song4)
  playlist2.songs << (song5)
  playlist2.songs << (song6)

  playlist3.songs << (song2)
  playlist3.songs << (song4)
  playlist3.songs << (song6)


  song1 = record2.songs.create!(title: "record2song1", lyrics: "lalala1")
  song2 = record2.songs.create!(title: "record2song2", lyrics: "lalala2")
  song3 = record2.songs.create!(title: "record2song3", lyrics: "lalala3")
  song4 = record2.songs.create!(title: "record2song4", lyrics: "lalala4")
  song5 = record2.songs.create!(title: "record2song5", lyrics: "lalala5")
  song6 = record2.songs.create!(title: "record2song6", lyrics: "lalala6")
  song7 = record2.songs.create!(title: "record2song7", lyrics: "lalala7")

  user2.song_likes.create!(song_id: song1.id)
  user2.song_likes.create!(song_id: song2.id)
  user2.song_likes.create!(song_id: song3.id)
  user2.song_likes.create!(song_id: song4.id)
  user2.song_likes.create!(song_id: song5.id)
  user2.song_likes.create!(song_id: song6.id)
  user2.song_likes.create!(song_id: song7.id)



  playlist1 = user3.playlists.create!(title: "playlist1user3", status: "public")
  playlist2 = user3.playlists.create!(title: "playlist2user3", status: "public")
  playlist3 = user3.playlists.create!(title: "playlist3user3", status: "private")


  playlist1.songs << (song1)
  playlist1.songs << (song2)
  playlist1.songs << (song3)

  playlist2.songs << (song4)
  playlist2.songs << (song5)
  playlist2.songs << (song6)

  playlist3.songs << (song2)
  playlist3.songs << (song4)
  playlist3.songs << (song6)


  song1 = record3.songs.create!(title: "record3song1", lyrics: "lalala1")
  song2 = record3.songs.create!(title: "record3song2", lyrics: "lalala2")
  song3 = record3.songs.create!(title: "record3song3", lyrics: "lalala3")
  song4 = record3.songs.create!(title: "record3song4", lyrics: "lalala4")
  song5 = record3.songs.create!(title: "record3song5", lyrics: "lalala5")
  song6 = record3.songs.create!(title: "record3song6", lyrics: "lalala6")
  song7 = record3.songs.create!(title: "record3song7", lyrics: "lalala7")

  user3.song_likes.create!(song_id: song1.id)
  user3.song_likes.create!(song_id: song2.id)
  user3.song_likes.create!(song_id: song3.id)
  user3.song_likes.create!(song_id: song4.id)
  user3.song_likes.create!(song_id: song5.id)
  user3.song_likes.create!(song_id: song6.id)
  user3.song_likes.create!(song_id: song7.id)


  user4.song_likes.create!(song_id: song1.id)
  user4.song_likes.create!(song_id: song2.id)
  user4.song_likes.create!(song_id: song3.id)
  user4.song_likes.create!(song_id: song4.id)
  user4.song_likes.create!(song_id: song5.id)
  user4.song_likes.create!(song_id: song6.id)
  user4.song_likes.create!(song_id: song7.id)

  playlist1 = user4.playlists.create!(title: "playlist1user4", status: "public")
  playlist2 = user4.playlists.create!(title: "playlist2user4", status: "public")
  playlist3 = user4.playlists.create!(title: "playlist3user4", status: "private")


  playlist1.songs << (song1)
  playlist1.songs << (song2)
  playlist1.songs << (song3)

  playlist2.songs << (song4)
  playlist2.songs << (song5)
  playlist2.songs << (song6)

  playlist3.songs << (song2)
  playlist3.songs << (song4)
  playlist3.songs << (song6)
