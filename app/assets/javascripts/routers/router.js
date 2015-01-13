Sonido.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$content = options.$content
  },
  routes: {
    "" : "home",
  },
  home: function(){
    var newestSongs = new Sonido.Collections.Songs();
    newestSongs.fetch();
    var homeView = new Sonido.Views.Home({collection: newestSongs});
    this._swapView(homeView);
  },
  _swapView: function(view){
    this._currentView && this._currentView.remove()
    this._currentView = view;
    this.$content.html(view.render().$el)
  }
})
