Sonido.Models.Playlist = Backbone.Model.extend({
  urlRoot: "api/playlists",
  parse: function(resp){
    if (resp.songs){
      this.songs().set(resp.songs, {parse: true})
      delete resp.songs
    }
    return resp
  },
  songs: function(){
    if (!this._songs) {
      this._songs = new Sonido.Collections.Songs([], {playlist: this})
    }
    return this._songs
  }
})
