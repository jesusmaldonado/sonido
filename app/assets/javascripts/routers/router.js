Sonido.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$content = options.$content;
    this.songs = options.songs;
    this.currentUser = options.currentUser;
    this.users = options.users;
    this.headerContainer = options.headerContainer;
    this.headerFunc();
  },
  routes: {
    "" : "home",
    "songs/:id" : "showSong",
    "users/:id/playlists": "userPlaylists",
    "users/:id/likes" : "userLikes"
  },
  home: function(){
    var recentSongs = new Sonido.Collections.RecentSongs();
    recentSongs.fetch();
    var homeView = new Sonido.Views.Home({collection: recentSongs});
    this._swapView(homeView);
  },
  showSong: function(id) {
    var specificSong = this.songs.getOrFetch(id);
    var showSongView = new Sonido.Views.ShowSongView({model: specificSong});
    this._swapView(showSongView);
  },
  headerFunc: function() {
    var headerView = new Sonido.Views.Header({model: this.currentUser})
    this.headerContainer.html(headerView.render().$el)
  },
  userPlaylists: function(id){
    var playlists = this.users.getOrFetch(id).playlists()
    var playlistsView = new Sonido.Views.PlaylistView({ collection: playlists })
    this._swapView(playlistsView);
  },
  userLikes : function(id){
    var likes = this.users.getOrFetch(id).likes()
    var likesView = new Sonido.Views.LikesView({collection: likes})
    this._swapView(likesView);
  },
  _swapView: function(view){
    this._currentView && this._currentView.remove()
    this._currentView = view;
    this.$content.html(view.render().$el)
  }
})
