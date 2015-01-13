Sonido.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$content = options.$content
    this.songs = options.songs
  },
  routes: {
    "" : "home",
    "/songs/:id" : "showSong"
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
  _swapView: function(view){
    this._currentView && this._currentView.remove()
    this._currentView = view;
    this.$content.html(view.render().$el)
  }
})
