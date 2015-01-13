Sonido.Views.ShowSongView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render)
  },
  template: JST["songs/show"],
  events: {
    "click .destroy" : "destroySong"
  },
  render: function(){
    var showContents = this.template({song: this.model})
    this.$el.html(showContents);
    return this;
  },
  destroySong: function(){
    this.model.destroy();
    Backbone.history.navigate("", {trigger: true});
  }
})
