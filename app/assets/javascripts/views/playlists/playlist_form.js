Sonido.Views.PlaylistForm = Backbone.View.extend({
  events: {
    "click .playlistSubmit" : "submitPlaylist"
  },
  tagName: "form",
  className: "playlistForm",
  template: JST["playlists/playlistform"],
  buttonTemplate: JST["playlists/button"],
  render: function(){
    var formContents = this.template({playlist: this.model});
    this.$el.html(formContents)
    return this;
  },
  submitPlaylist: function(event){
    event.preventDefault()
    var formData = this.$el.serializeJSON();
    var currentCollection = this.collection;
    var formView = this;

    this.model.save(formData, {
      success: function(savedPlaylist){
        currentCollection.add(savedPlaylist, {merge: true})
        Backbone.View.prototype.remove.call(formView);
      }
    });
  }
})
