Sonido.Views.Home = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'sync change', this.render);
    this.subViews = []
  },
  events: {
    "click .likeSong" : "likeSong",
    "click .unlikeSong" : "unlikeSong",
    "click .addToPlaylist" : "addToPlaylist"
  },
  template: JST["home"],
  className: "popularFeed",
  render: function(){
    var homeContents = this.template({ songs: this.collection });
    var currentView = this;
    this.$el.html(homeContents);
    this.collection.each(function(song){
        var songView = new Sonido.Views.ShowSongView({model: song})
        currentView.subViews.push(songView)
        var element = $("<li></li>").html((songView.render().$el))
        currentView.$el.find(".popular-song-section").append(element)
    })
    return this;
  },
  remove: function(){
    this.subViews.forEach(function(subView) {
      subView.remove()
    })
    Backbone.View.prototype.remove.call(this)
  }
})
