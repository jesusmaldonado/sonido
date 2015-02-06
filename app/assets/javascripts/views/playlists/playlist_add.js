Sonido.Views.PlaylistAdd = Backbone.View.extend({
  template: JST["playlists/playlistadd"],
  initialize: function(options){
    this.song = options.song;
    this.container = options.container;
    this.formContainer = options.formContainer;
    this.listenTo(this.collection, 'sync change add remove', this.render)
    this.playlistForm = null;
  },
  events: {
    "click .selectedPlaylist" : "handlePlaylistSong",
    "click .makePlaylist": "playlistForm",
    "click .closeForm" : "closeForm"
  },
  className: "playlistSelect",
  tagName: "ul",
  render: function(){
    var playlistAddContents = this.template({playlists: this.collection, song: this.song})
    this.$el.html(playlistAddContents)
    this.container.html(this.$el);
  },
  handlePlaylistSong: function(event){
    var playlistId = $(event.currentTarget).data("playlist-id");
    var playlistContains = $(event.currentTarget).data("playlist-contains");
    var songId = this.song.id;
    var jsonData = {
      playlist_id: playlistId,
      song_id: songId
    };
    var playlists = this.collection
    var playlist = this.collection.get(playlistId)

    var song = this.song;
    var thisView = this;

    if (playlistContains === "notInPlaylist"){
        var ajaxOptions = {
          url: "api/playlist_songs",
          type: "POST",
          dataType: "json",
          data: jsonData,
          success: function(resp){
            playlist.songs().add(song);
            thisView.render();
          }
        }
    } else {
        var ajaxOptions = {
          url: "api/playlist_songs/removePlaylistSong",
          type: "DELETE",
          dataType: "json",
          data: jsonData,
          success: function(resp){
            playlist.songs().remove(song);
            thisView.render();
          }
        }
    }
    $.ajax(ajaxOptions);
  },
  playlistForm: function(){
    this.playlistForm = new Sonido.Views.PlaylistForm({model: new Sonido.Models.Playlist(),
      callback: this.closeForm.bind(this),
      collection: this.collection,
      rerender: this.rerender})
    this.formContainer.html(this.playlistForm.render().$el)
  },
  remove: function(){
    this.playlistForm && this.playlistForm.remove()
    this.container.html("")
    this.formContainer.html("")
    Backbone.View.prototype.remove.call(this)
  },
  rerender: function(){
    this.formContainer.html(this.playlistForm.$el)
  },
  closeForm: function(){
    this.formContainer.html("")
    this.playlistForm.remove()
  }

})
