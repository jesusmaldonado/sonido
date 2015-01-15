Sonido.Views.Home = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'sync change', this.render);
  },
  events: {
    "click .likeSong" : "likeSong",
    "click .unlikeSong" : "unlikeSong",
    "click .addToPlaylist" : "addToPlaylist"
  },
  template: JST["home"],
  className: "popularFeed",
  render: function(){
    var homeContents = this.template({ songs: this.collection });
    this.$el.html(homeContents);
    return this;
  },
  likeSong: function(event) {
    var songId = $(event.currentTarget).data("song-id");
    var data = {song_like: {song_id: songId}};

    var recentSongs = this.collection
    var song = this.collection.get(songId);
      $.ajax({
        url: "api/song_likes",
        type: "POST",
        dataType: "json",
        data: data,
        success: function(){
          song.set({liked: "liked"});
          recentSongs.trigger("change");

        },
        error: function(){

        }
      });
  },
  unlikeSong: function(event) {
    var songId = $(event.currentTarget).data("song-id");
    var data = {song_id: songId};

    var recentSongs = this.collection;
    var song = this.collection.get(songId);

    $.ajax({
      url: "api/song_likes/removeSongLike",
      type: "DELETE",
      dataType: "json",
      data: data,
      success: function(){
        song.set({liked: "notliked"});
        recentSongs.trigger("change");
      },
      error: function(){

      }
    });
  },
  addToPlaylist: function(event){
    event.preventDefault();
    var songId = $(event.currentTarget).data("song-id");
    var song = this.collection.get(songId);

    var playlistAddView = new Sonido.Views.PlaylistAdd({
      song: song,
      collection: Sonido.currentUser.playlists(),
      recentSongs: this.collection,
      $el: $(".containerAddPlaylist") })
    playlistAddView.render();
  }
})
