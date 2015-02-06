Sonido.Models.Recording = Backbone.Model.extend({
  urlRoot: "api/recordings",
  parse: function(resp){
    if (resp.songs) {
      this.songs().set(resp.songs, {parse: true})
      delete resp.songs
    }
    return resp
  },
  songs: function(){
    if (!this._songs) {
      this._songs = new Sonido.Collections.Songs([], {recording: this})
    }
    return this._songs
  },
  toJSON: function(){
    var json = {recording: _.clone(this.attributes)};

    if (this._image) {
      json.recording.image = this._image;
    }

    return json;
  }

})
