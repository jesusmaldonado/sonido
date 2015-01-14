Sonido.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$content = options.$content
    this.songs = options.songs
    this.currentUser = options.currentUser
    this.headerContainer = options.headerContainer
    this.headerFunc()
  },
  routes: {
    "" : "home",
    "songs/:id" : "showSong",
    "users/:id/playlists": "userPlaylists"
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
  userPlaylists: function(){
    
  },
  _swapView: function(view){
    this._currentView && this._currentView.remove()
    this._currentView = view;
    this.$content.html(view.render().$el)
  }
})
