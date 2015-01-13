Sonido.Views.ShowSongView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render)
  },
  template: JST["songs/show"],
  render: function(){
    var showContents = this.template({song: this.model})
    this.$el.html(showContents);
    return this;
  }
})
