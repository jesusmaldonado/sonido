Sonido.Views.ShowSongView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render)
    this.listenTo(this.model.songLike(), 'sync destroy', this.render)
  },
  template: JST["songs/show"],
  events: {
    "click .destroySong" : "destroySong",
    "click .unliked" : "createLike",
    "click .liked" : "destroyLike"
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
    var likedStatus = this.model.songLike().get("id");
    console.log(likedStatus)
    if (!likedStatus) {
      likeButton.html("Like this song!");
      likeButton.toggleClass("unliked");
    } else {
      likeButton.html("Unlike this song!");
      likeButton.toggleClass("liked");
    }
  },
  createLike: function(event){
    var song_id = $(event.currentTarget).data("id");
    var likeButton = this.$el.find(".songLikeStatus");

    var newLike = new Sonido.Models.SongLike({song_id: song_id})
    var _currentShowView = this;
    var currentSong = this.model;

    newLike.save({}, {
      success: function(newLike) {
        currentSong._songLike = newLike;
        likeButton.toggleClass("unliked");
        _currentShowView.render();
      }
    })
  },
  destroyLike: function() {
    var likeButton = this.$el.find(".songLikeStatus")
    var _currentShowView = this;
    var currentSong = this.model;

    currentSong.songLike().destroy({
      success: function(){
        currentSong._songLike = null;
        likeButton.toggleClass("liked");
        _currentShowView.render();
      }
    })
  }
})
