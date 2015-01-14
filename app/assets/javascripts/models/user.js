Sonido.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",
  parse: function(resp){
    if (resp.playlists) {
      this.playlists().set(resp.artist, {parse: true})
      delete resp.playlists
    }

    if (resp.recordings) {
      this.recordings().set(resp.recordings, {parse: true})
      delete resp.recordings
    }
    return resp
  },
  playlists: function(){
    if (!this._playlists) {
      this._playlists = new Sonido.Collections.Playlists();
    }
    return this._playlists
  },
  recordings: function(){
    if (!this._recordings) {
      this._recordings = new Sonido.Collections.Recordings();
    }
    return this._recordings
  },
})
