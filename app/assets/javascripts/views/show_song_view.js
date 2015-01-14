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
    return this;
  },
  destroySong: function(){
    this.model.destroy();
    Backbone.history.navigate("", {trigger: true});
  },
  handleLike: function(event){
    var likeButton = this.$el.find(".songLikeStatus")
    var likedStatus = likeButton.data("liked")

    var song_id = $(event.currentTarget).data("id");

    if (likedStatus === "true") {
      createLike(song_id);
    } else {
      destroyLike(song_id);
    }
  },
  createLike: function(song_id){
    var newLike = new Sonido.Models.SongLike({song_id: song_id})
    var _currentShowView = this;
    newLike.save({}, {
      success: function(){
        _currentShowView.changeButton()
      }
    })
  },
  destroyLike: function(song_id){

  },
  changeButton: function(){
    var likeButton = this.$el.find(".songLikeStatus")
    var status = likeButton.data("liked")
    if (status === "true") {
      //do stuff for destroy
    } else {
      
    }
  }
})
