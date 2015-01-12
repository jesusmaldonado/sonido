Sonido.Views.Header = Backbone.CompositeView.extend({
  initialize: function(options){
    this.$el = options.$el
  },
  template: JST["shared/header"]

})
