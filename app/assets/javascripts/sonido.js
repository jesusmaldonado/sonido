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
      songs: songs
    });
    Backbone.history.start()
  }
};
