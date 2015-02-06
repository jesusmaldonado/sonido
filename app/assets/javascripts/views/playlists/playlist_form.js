Sonido.Views.PlaylistForm = Backbone.View.extend({
  events: {
    "click .playlistSubmit" : "submitPlaylist",
    "click .closeform": "close"
  },
  initialize: function(options){
    this.callback = options.callback
    this.rerender = options.rerender
  },
  tagName: "form",
  className: "playlistForm",
  template: JST["playlists/playlistform"],
  buttonTemplate: JST["playlists/button"],
  render: function(){
    var formContents = this.template({playlist: this.model});
    this.$el.html(formContents)
    return this;
  },
  submitPlaylist: function(event){
    event.preventDefault()
    var formData = this.$el.serializeJSON();
    var currentCollection = this.collection;
    var formView = this;
    var callback = this.callback;
    var errorRender = this.errorRender.bind(this)
    this.model.save(formData, {
      success: function(savedPlaylist){
        currentCollection.add(savedPlaylist, {merge: true})
        callback()
      },
      error: function(model, resp){
        var errors = resp.responseJSON
        errorRender(errors)
      }
    });
  },
  errorRender: function(errors) {

    for(var i in errors) {
      this.$el.find(".errors").html(errors[i])
    }
    this.rerender()
  },
  close: function(event){
    event.preventDefault()
      this.callback()
  }
})
