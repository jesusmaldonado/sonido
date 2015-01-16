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

    if (resp.liked === "liked") {
      this.songLike().set(resp.song_like, {parse: true})
      delete resp.song_like
    }

    if (resp.playlists) {
      this.playlists().set(resp.playlists, {parse: true})
      delete resp.playlists
    }
    return resp;
  },
  user: function(){
    if (!this._user) {
      this._user = new Sonido.Models.User();
    }
    return this._user
  },
  playlists: function(){
    if (!this._playlists){
      this._playlists = new Sonido.Collections.Playlists()
    }
    return this._playlists
  },
  recording: function(){
    if (!this._recording) {
      this._recording = new Sonido.Models.Recording();
    }
    return this._recording
  },
  songLike: function(){
    if (!this._songLike) {
      this._songLike = new Sonido.Models.SongLike();
    }
    return this._songLike
  },
  toJSON: function(){
  // We want proper namespacing of our attributes in Rails.
    var json = {song: _.clone(this.attributes)};

    if (this._audio_song) {
      json.song.audio_song = this._audio_song;
    }

    return json;
  }

});
