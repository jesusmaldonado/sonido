Sonido.Views.PlaylistAdd = Backbone.View.extend({
  template: JST["playlists/playlistadd"],
  initialize: function(options){
    this.song = options.song
    this.recentSongs = options.recentSongs
    this.$el = options.$el
  },
  events: {
    "click .selectedPlaylist" : "handlePlaylistSong",
    "click .close" : "close"
  },
  className: "playlistSelect",
  tagName: "ul",
  render: function(){
    var playlistAddContents = this.template({playlists: this.collection, song: this.song})
    this.$el.html(playlistAddContents);
  },
  handlePlaylistSong: function(event){
    var playlistId = $(event.currentTarget).data("playlist-id");
    var playlistContains = $(event.currentTarget).data("playlist-contains");
    var songId = this.song.id;
    var jsonData = {
      playlist_id: playlistId,
      song_id: songId
    };

    var playlists = this.collection
    var playlist = this.collection.get(playlistId)

    var recentSongs = this.recentSongs
    var song = this.song;
    var thisView = this;

    if (playlistContains === "notInPlaylist"){
        var ajaxOptions = {
          url: "api/playlist_songs",
          type: "POST",
          dataType: "json",
          data: jsonData,
          success: function(resp){
            playlist.songs().add(song);
            thisView.render();
          }
        }
    } else {
        var ajaxOptions = {
          url: "api/playlist_songs/removePlaylistSong",
          type: "DELETE",
          dataType: "json",
          data: jsonData,
          success: function(resp){
            playlist.songs().remove(song);
            thisView.render();
          }
        }
    }

    $.ajax(ajaxOptions);
  },
  close: function(){
    this.recentSongs.trigger("change")
    Backbone.View.prototype.remove.call(this)
  }
})
