window.Sonido = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    Sonido.currentUser = new Sonido.Models.CurrentUser();
    Sonido.currentUser.fetch();

    var $content = $(".content");
    var router = new Sonido.Routers.Router({
      $content = $content
    });
    Backbone.history.start()
    alert("hit backbone WOW");
  }
};
