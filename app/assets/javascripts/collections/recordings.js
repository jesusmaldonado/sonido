Sonido.Collections.Recordings = Backbone.Collection.extend({
  url: "api/recordings",
  model: Sonido.Models.Recording,
  getOrFetch: function(id){
    var model = this.get(id);
    var _currentCollection = this;
    if (!model) {
      model = new Sonido.Models.Recording({id: id});
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
