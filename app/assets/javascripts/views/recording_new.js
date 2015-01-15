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
        delete model._image;
        Backbone.history.navigate("recording/:id", {trigger: true})
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
      console.log(thisView.model)
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      thisView._updatePreview("")
      delete this.model._image

      console.log(thisView.model)
    }

  },
  _updatePreview: function(src){
    this.$el.find("#preview-post-image").attr("src", src).addClass("preview");
  }
})
