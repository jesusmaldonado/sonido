Sonido.Views.ShowSongView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render)
  },
  template: JST["songs/show"],
  events: {
    "click .destroySong" : "destroySong",
    "click .likeSong" : "createLike",
    "click .unlikeSong" : "destroyLike"
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
      likeButton.html("Like this song!");
      likeButton.data("status", "unliked");
      likeButton.toggleClass("likeSong");
    } else {
      likeButton.html("Unlike this song!");
      likeButton.data("status", "liked");
      likeButton.toggleClass("unlikeSong");
    }
  },
  createLike: function(event){
    var song_id = $(event.currentTarget).data("id");
    var likeButton = this.$el.find(".songLikeStatus")

    var newLike = new Sonido.Models.SongLike({song_id: song_id})
    var _currentShowView = this;
    var currentSong = this;
    newLike.save({}, {
      success: function(model) {
        currentSong._songLike = model;
        likeButton.toggleClass("likeSong");
        _currentShowView.render();
      }
    })
  },
  destroyLike: function() {
    var likeButton = this.$el.find(".songLikeStatus")
    var _currentShowView = this;

    this.model.songLike().destroy({
      success: function(){
        likeButton.toggleClass("unlikeSong");
        _currentShowView.render();
      }
    })
  }

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

  // destroyLike: function(song_id){
  //
  //},

})
