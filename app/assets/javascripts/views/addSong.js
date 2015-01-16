Sonido.Views.NewSong = Backbone.View.extend({
  template: JST["songs/new"],
  tagName: "form",
  className: "newSong",
  events: {
    "click .submit":"submit",
    "click .close" : "close",
    "change #input-post-song": "progress"
  },
  initialize: function(options){
    this.newSong = options.newSong;
    this.recording = options.recording;
    this.count = options.count;
  },
  render: function(){
    var newForm = this.template({newSong: this.newSong, recording: this.recording, count: this.count})
    this.$el.html(newForm);
    return this;
  },
  submit: function(event){
    event.preventDefault()
    formData = this.$el.serializeJSON().song;
    var currentView = this;
    var recording = this.recording
    var recordingSongs = this.recording.songs()
    this.newSong.save(formData, {
      success: function(model){
        recordingSongs.add(model)
        delete model._audio_song;
        recording.trigger("change")
      }
    })
  },
  progress: function(event){
    var thisView = this;
    var file = event.currentTarget.files[0]
    var reader = new FileReader();

    reader.onloadstart = function(event){
      thisView._updateProgress(event)
    }

  },
  close: function(event){
    event.preventDefault()
    Backbone.View.prototype.remove.call(this);
  },
  _updateProgress: function(event){
    console.log(event)

  }
})
