Sonido.Views.PlaylistView = Backbone.View.extend({
  template: JST["playlists/playlistshow"],
  initialize: function(){
    this.listenTo(this.collection, 'sync change add remove changeSong', this.render)
    this.subViews = []
  },
  events: {
    "click .addPlaylist" : "addPlaylist",
    "click .destroyPlaylist" : "destroyPlaylist"
  },
  render: function() {
    var showContents = this.template({playlists: this.collection})
    this.$el.html(showContents);
    var currentView = this
    this.collection.each(function(playlist){
      playlist.songs().each(function(song){
        var songView = new Sonido.Views.ShowSongView({model: song})
        currentView.subViews.push(songView)
        currentView.$el.find(".playlistsongs" + String(playlist.id)).append(songView.render().$el)
      })
    })
    return this;
  },
  destroyPlaylist: function(event){
    var playlistId = $(event.currentTarget).data("playlist-id")
    var playlist = this.collection.getOrFetch(playlistId);
    playlist.destroy();
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
