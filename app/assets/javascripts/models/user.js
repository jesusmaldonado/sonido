Sonido.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",
  parse: function(resp){
    if (resp.playlists) {
      this.playlists().set(resp.playlists, {parse: true})
      delete resp.playlists
    }

    if (resp.recordings) {
      this.recordings().set(resp.recordings, {parse: true})
      delete resp.recordings
    }

    if (resp.likes){
      this.likes().set(resp.likes, {parse: true})
      delete resp.likes
    }
    return resp;
  },
  playlists: function(){
    if (!this._playlists) {
      this._playlists = new Sonido.Collections.Playlists([], {user: this});
    }
    return this._playlists
  },
  recordings: function(){
    if (!this._recordings) {
      this._recordings = new Sonido.Collections.Recordings([], {user: this});
    }
    return this._recordings
  },
  likes: function(){
    if (!this._likes) {
      this._likes = new Sonido.Collections.Songs([], {user: this})
    }
    return this._likes
  },

  toJSON: function(){
  // We want proper namespacing of our attributes in Rails.
    var json = {user: _.clone(this.attributes)};

    if (this._avatar) {
      json.user.avatar = this._avatar;
    }

    return json;
  }


})
