window.Sonido = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $content = $(".content");

    var songs = new Sonido.Collections.Songs()
    songs.fetch();

    var router = new Sonido.Routers.Router({
      $content: $content,
      songs: songs,
      currentUser: Sonido.currentUser,
      headerContainer: $(".header-container")
    });
    Backbone.history.start()
  }
};
