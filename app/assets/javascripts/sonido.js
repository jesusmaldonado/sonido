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

    Sonido.currentUser = new Sonido.Models.CurrentUser
    Sonido.currentUser.fetch()

    var recordings = new Sonido.Collections.Recordings();
    recordings.fetch();
    var router = new Sonido.Routers.Router({
      $content: $content,
      songs: songs,
      users: users,
      recordings: recordings,
      currentUser: Sonido.currentUser,
      headerContainer: $(".header-container"),
      sidebarContainer: $(".sidebar")
    });
    Backbone.history.start()
  }

};
