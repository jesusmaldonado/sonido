Sonido.Views.PlaylistView = Backbone.View.extend({
  template: JST["playlists/playlistshow"],
  initialize: function(){
    this.listenTo(this.collection, 'sync change add remove changeSong', this.render)
  },
  events: {
    "click .removeSong" : "removeSong",
    "click .unlikeSong" : "unlikeSong",
    "click .likeSong" : "likeSong",
    "click .addPlaylist" : "addPlaylist"
  },
  render: function() {
    var showContents = this.template({playlists: this.collection})
    this.$el.html(showContents);
    return this;
  },
  removeSong: function(event){
    var songId = $(event.currentTarget).data("song-id");
    var playlistId = $(event.currentTarget).data("playlist-id");
    var data = {song_id: songId, playlist_id: playlistId};


    var playlist = this.collection.get({id: playlistId});
    var song = playlist.songs().get({id: songId});

    var playlists = this.collection
    $.ajax({
      url: 'api/playlist_songs/removePlaylistSong',
      type: "DELETE",
      dataType: "json",
      data: data,
      success: function(){
        playlist.songs().remove(song)
        playlists.trigger("change")
      },
      error: function(){
      }
    });
  },
  unlikeSong: function(event) {
    var songId = $(event.currentTarget).data("song-id");
    var data = {song_id: songId};
    var playlistId = $(event.currentTarget).data("playlist-id");
    var playlistView = this;
    var playlists = this.collection
    var playlist = playlists.get({id: playlistId});
    var song = playlist.songs().get({id: songId});

    $.ajax({
      url: "api/song_likes/removeSongLike",
      type: "DELETE",
      dataType: "json",
      data: data,
      success: function(){
        song.set({liked: "notliked"})
        playlists.trigger("change")
      },
      error: function(){

      }
    });
  },
  likeSong: function(event) {
    var songId = $(event.currentTarget).data("song-id");
    var data = {song_like: {song_id: songId}};
    var playlistId = $(event.currentTarget).data("playlist-id");
    var playlistView = this;
    var playlists = this.collection
    var playlist = playlists.get({id: playlistId});
    var song = playlist.songs().get({id: songId});

      $.ajax({
        url: "api/song_likes",
        type: "POST",
        dataType: "json",
        data: data,
        success: function(){
          song.set({liked: "liked"})
          playlists.trigger("change")

        },
        error: function(){

        }
      });
  },
  addPlaylist: function(){
    var currentPlaylists = this.collection;
    var newPlaylist = new Sonido.Models.Playlist();
    var newPlaylistView = new Sonido.Views.PlaylistForm({
      collection: currentPlaylists,
      model: newPlaylist
    })
    $(".containerForAdd").html(newPlaylistView.render().$el)
  }
})
