Sonido.Views.RecordingShow = Backbone.View.extend({
  template: JST["recordings/show"],
  initialize: function(){
    this.listenTo(this.model, 'sync add change remove', this.render)
    this.subviews = []
    this.count = 0;
  },
  events: {
    "click .addSong" : "addSong"
  },
  className: "show group",
  render: function(){
    var showContents = this.template({recording: this.model});
    this.$el.html(showContents);
    return this;
  },
  addSong: function() {
    var newSong = new Sonido.Models.Song()
    var newSongView = new Sonido.Views.NewSong ({
      recording: this.model,
      newSong: newSong,
      count: this.count });
    this.count += 1;
    $(".containerForAdd").after(newSongView.render().$el);
  },
  remove: function(){
    this.subviews.forEach(function(subview){
      subview.remove();
    })
    Backbone.View.prototype.remove.call(this);
  }
})
