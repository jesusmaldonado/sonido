Sonido.Models.Recording = Backbone.Model.extend({
  urlRoot: "api/recordings",
  parse: function(resp){
    if (resp.songs){
      this.songs().set(resp.artist, {parse: true})
      delete resp.songs
    }
  },
  songs: function(){
    if (!this._songs) {
      this._songs = new Sonido.Collections.Songs()
    }
    return this._songs
  }
})
