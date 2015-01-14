Sonido.Views.ShowSongView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render)
  },
  template: JST["songs/show"],
  events: {
    "click .destroySong" : "destroySong",
    "click .likeSong" : "handleLike"
  },
  render: function(){
    var showContents = this.template({song: this.model})
    this.$el.html(showContents);
    this.renderButton();
    return this;
  },
  renderButton: function(){
    var likeButton = this.$el.find(".songLikeStatus")


    var songLike = this.model.songLike()
    var likedStatus = this.model.songLike().get("id")
    if (!likedStatus) {
      likeButton.html("Like this song!")
    } else {
      likeButton.html("Unlike this song!");
    }
  },
  createLike: function(song_id){
    var newLike = new Sonido.Models.SongLike({song_id: song_id})
    var _currentShowView = this;
    var currentSong = this;
    newLike.save({}, {
      success: function(model){
        currentSong._songLike = model;
        _currentShowView.render();
      }
    })
  },
  // destroySong: function(){
  //   this.model.destroy();
  //   Backbone.history.navigate("", {trigger: true});
  // },
  handleLike: function(event){
    var song_id = $(event.currentTarget).data("id");

  //   var likeButton = this.$el.find(".songLikeStatus")
  //   var likedStatus = likeButton.data("liked")
  //
  //
  //   if (likedStatus === "true") {
  //     createLike(song_id);
  //   } else {
  //     likeButton.data("songLikeId")
  //     destroyLike(song_id);
  //   }
  },

  // destroyLike: function(song_id){
  //
  //},

})
