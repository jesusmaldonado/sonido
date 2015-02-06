Sonido.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.recentSongs = options.recentSongs;
    this.$content = options.$content;
    this.currentUser = options.currentUser;
    this.users = options.users;
    this.songs = options.songs;
    this.headerContainer = options.headerContainer;
    this.headerFunc();
  },
  routes: {
    "" : "home",
    "songs/:id" : "showSong",
    "users/new": "userNew",
    "users/:id/playlists": "userPlaylists",
    "users/:id/likes" : "userLikes",
    "newRecording" : "newRecording",
    "recording/:id": "recordingShow",
    "uploads" : "userUploads",
    "session/new": "signIn"
  },
  home: function(){
    var recentSongs = this.recentSongs
    var homeView = new Sonido.Views.Home({collection: recentSongs});
    this._swapView(homeView);
  },
  showSong: function(id) {
    var specificSong = this.songs.getOrFetch(id);
    var showSongView = new Sonido.Views.ShowSongView({model: specificSong});
    this._swapView(showSongView);
  },
  userPlaylists: function(id){
    var playlists = this.users.getOrFetch(id).playlists()
    var playlistsView = new Sonido.Views.PlaylistView({ collection: playlists })
    this._swapView(playlistsView);
  },
  userLikes : function(id){
    var likes = this.users.getOrFetch(id).likes()
    var likesView = new Sonido.Views.LikesView({collection: likes})
    this._swapView(likesView);
  },
  headerFunc: function() {
    var headerView = new Sonido.Views.Header({model: this.currentUser})
    this.headerContainer.html(headerView.render().$el)
  },
  userUploads: function(){
    var uploadView = new Sonido.Views.UploadView({model: this.currentUser})
    this._swapView(uploadView);
  },
  userNew: function(){
    var newUser = new Sonido.Models.User()
    var userNewView = new Sonido.Views.UsersForm({model: newUser, collection: this.users })
    this._swapView(userNewView)
  },
  newRecording: function(){

    var newRecording = new Sonido.Models.Recording()

    var newRecordingView = new Sonido.Views.RecordingForm({
      model: newRecording,
      collection: this.currentUser.recordings()
    })

    this._swapView(newRecordingView)
  },
  recordingShow: function(id){
    var recording = this.recordings.getOrFetch(id);

    var recordingShowView = new Sonido.Views.RecordingShow({
      model: recording
    })
    this._swapView(recordingShowView)
  },
  signIn: function(callback){
    if (!this._requireSignedOut(callback)) { return; }
    var newUser = new Sonido.Models.User()
    var signInView = new Sonido.Views.SignIn({
      callback: callback,
      user: newUser
    });

    this._swapView(signInView);
  },
  _swapView: function(view){
    this._currentView && this._currentView.remove()
    this._currentView = view;
    this.$content.html(view.render().$el)
  },
  _requireSignedIn: function(callback){
    if (!Sonido.currentUser.isSignedIn()){
      //can redirect to custom callbacks here
      callback = callback || this._goHome.bind(this);
      this.signIn(callback);
      return false;
    }
    return true;
  },
    _requireSignedOut: function(callback){
    if (Sonido.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }

    return true;
  },
  _goHome: function(){
    Backbone.history.navigate("", { trigger: true });
  },
})
