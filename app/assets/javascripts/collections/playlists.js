Sonido.Collections.Playlists = Backbone.Collection.extend({
  url: "api/playlists",
  model: Sonido.Models.Playlist,
  getOrFetch: function(id){
    var model = this.get(id);
    var _currentCollection = this;
    if (!model) {
      model = new Sonido.Models.Playlist({id: id});
      model.fetch({
        success: function(model){
          _currentCollection.add(model, {merge: true});
        }
      });
    } else {
      model.fetch(id)
    }
    return model;
  }
});
