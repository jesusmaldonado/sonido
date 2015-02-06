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
    var json = {user: _.clone(this.attributes)};

    if (this._avatar) {
      json.user.avatar = this._avatar;
    }

    return json;
  }

})
Sonido.Models.CurrentUser = Sonido.Models.User.extend({

  url: "/api/session",

  initialize: function(options){
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isSignedIn: function() {
    return !this.isNew();
  },

  signIn: function(options){
    var model = this;
    var credentials = {
      "user[email]": options.email,
      "user[password]": options.password,
      "user[username]": options.username
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data){
        model.set(data);
        options.success && options.success();
      },
      error: function(data, string){
        options.error && options.error(string);
      }
    });
  },

  signOut: function(options){
    var model = this;

    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function(data){
        model.clear();
        options.success && options.success();
      }
    });
  },

  fireSessionEvent: function(){
    if(this.isSignedIn()){
      this.trigger("signIn");
      console.log("currentUser is signed in!", this);
    } else {
      this.trigger("signOut");
      console.log("currentUser is signed out!", this);
    }
  }

});
