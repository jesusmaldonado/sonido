window.Sonido = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $content = $(".content");

    var songs = new Sonido.Collections.Songs()
    songs.fetch();

    var users = new Sonido.Collections.Users()
    users.fetch();

    var router = new Sonido.Routers.Router({
      $content: $content,
      songs: songs,
      users: users,
      currentUser: Sonido.currentUser,
      headerContainer: $(".header-container")
    });
    Backbone.history.start()
  }
};
