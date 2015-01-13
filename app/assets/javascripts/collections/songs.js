Sonido.Collections.Songs = Backbone.Collection.extend({
  url: "api/songs",
  model: Sonido.Models.Song,
  getOrFetch: function(id){
    var model = this.get(id);
    var _currentCollection = this;
    if (!model) {
      model = new Sonido.Models.Song({id: id});
      model.fetch({
        success: function(model){
          _currentCollection.add(model);
        }
      });
    } else {
      model.fetch(id)
    }
    return model;
  }
});

Sonido.Collections.RecentSongs = Backbone.Collection.extend({
  url: "api/songs/recent",
  model: Sonido.Models.Song
});
