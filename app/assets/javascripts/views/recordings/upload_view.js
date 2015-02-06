Sonido.Views.UploadView = Backbone.View.extend({
  template: JST["recordings/uploads"],
  render: function(){
    var uploadContents = this.template({recordings: this.model.recordings()})
    this.$el.html(uploadContents);
    return this;
  }
})
