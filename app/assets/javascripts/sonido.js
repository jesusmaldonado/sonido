window.Sonido = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $content = $(".content");

    var users = new Sonido.Collections.Users()
    users.fetch();

    Sonido.currentUser = new Sonido.Models.CurrentUser
    Sonido.currentUser.fetch()
    var recentSongs = new Sonido.Collections.RecentSongs();
    recentSongs.fetch();
    var songs = new Sonido.Collections.Songs()
    songs.fetch()
    var router = new Sonido.Routers.Router({
      $content: $content,
      users: users,
      songs: songs,
      recentSongs: recentSongs,
      currentUser: Sonido.currentUser,
      headerContainer: $(".header-container"),
      sidebarContainer: $(".sidebar")
    });
    Backbone.history.start()
  }

};
