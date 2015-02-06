Sonido.Views.RecordingForm = Backbone.View.extend({
  template: JST["recordings/form"],
  tagName: "form",
  className: "new group",
  events: {
    "click .submit" : "submit",
    "change #input-post-image" : "preview"
  },
  render: function(){
    var formContents = this.template({recording: this.model})
    this.$el.html(formContents);
    return this;
  },
  submit: function(event){
    event.preventDefault()
    formData = this.$el.serializeJSON().recording;
    var currentView = this;

    this.model.save(formData, {
      success: function(model){
        currentView.collection.add(model)
        Backbone.history.navigate("recording/"+model.id, {trigger: true})
        delete model._image;
      }
    })
  },
  preview: function(event){
    var thisView = this;
    var file = event.currentTarget.files[0]
    var reader = new FileReader();



    reader.onloadend = function (){
      thisView._updatePreview(reader.result);
      thisView.model._image = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      thisView._updatePreview("")
      delete this.model._image

    }


  },
  _updatePreview: function(src){
    this.$el.find("#preview-post-image").attr("src", src).addClass("preview");
  }
})
