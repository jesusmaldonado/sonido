Sonido.Views.PlaylistView = Backbone.View.extend({
  template: JST["playlists/playlistshow"],
  initialize: function(){
    this.listenTo(this.collection, 'sync', this.render)
  },
  render: function() {
    console.log(this.collection)
    var showContents = this.template({playlists: this.collection})
    this.$el.html(showContents);
    return this;
  }
})
