Sonido.Views.PlaylistAdd = Backbone.View.extend({
  template: JST["playlists/playlistadd"],
  className: "playlistSelect",
  tagName: "ul",
  render: function(){
    var playlistAddContents = this.template({playlists: this.collection})
  }
})
