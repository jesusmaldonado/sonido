Sonido.Views.Home = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'sync', this.render)
  },
  template: JST["home"],
  className: "popularFeed",
  events: {

  },
  render: function(){
    var homeContents = this.template({ songs: this.collection });

    this.$el.html(homeContents);
    return this;
  }
})
