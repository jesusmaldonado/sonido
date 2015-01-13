Sonido.Models.Song = Backbone.Model.extend({
  urlRoot: "api/songs",
  parse: function(resp){
    if (resp.artist){
      this.user().set(resp.artist, {parse: true});
      delete resp.artist
    }

    if (resp.recording) {
      this.recording().set(resp.recording, {parse: true})
      delete resp.recording
    }
    return resp;
  },
  user: function(){
    if (!this._user) {
      this._user = new Sonido.Models.User()
    }
    return this._user
  },
  recording: function(){
    if (!this._recording) {
      this._recording = new Sonido.Models.Recording()
    }
    return this._user
  }
});
