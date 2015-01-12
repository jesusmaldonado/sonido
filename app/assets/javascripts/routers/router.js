Sonido.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$content = options.$content
  },
  routes: {
    "" : "home"
  },
  home: function() {

  }
})
