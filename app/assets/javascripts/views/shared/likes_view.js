Sonido.Views.LikesView = Backbone.View.extend({
  template: JST["likes/likesshow"],
  initialize: function(){
    this.listenTo(this.collection, 'sync remove change add', this.render)
  },
  events: {
    "click .unlikeSong" : "unlikeSong"
  },
  render: function(){
    var showContents = this.template({likes: this.collection});
    this.$el.html(showContents);
    return this;
  },
  unlikeSong: function(event){
    var songId = $(event.currentTarget).data("song-id")
    var data = {song_id: songId};

    var likes = this.collection
    var song = likes.get(songId);
    $.ajax({
        url: "api/song_likes/removeSongLike",
        type: "DELETE",
        dataType: "json",
        data: data,
        success: function(){
          song.set({liked: "notliked"})
          likes.remove(song)
        },
        error: function(){

        }
    });
  }
})
