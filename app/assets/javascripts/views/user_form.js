Sonido.Views.UsersForm = Backbone.View.extend({
  initialize: function(options){
    this.listenTo(this.model, 'sync change', this.render)
  },
  template: JST["users/userform"],
  events: {
    "submit form": "submit",
    "change #input-post-image" : "preview"
  },

  render: function(){
    var html = this.template({ user: this.model });
    this.$el.html(html);

    return this;
  },
  submit: function(event){
    event.preventDefault();

    var $form = $(event.currentTarget);
    var userData = $form.serializeJSON().user;
    var thisView = this;

    this.model.set(userData);
    this.model.save({}, {
      success: function(model){
        Sonido.currentUser.fetch();
        thisView.collection.add(model, { merge: true });
        Backbone.history.navigate("", { trigger: true });
        delete model._avatar;
      },
      error: function(data, response){
        c
      }
    });
  },
  preview: function(event){
    var thisView = this;
    var file = event.currentTarget.files[0]
    var reader = new FileReader();



    reader.onloadend = function (){
      thisView._updatePreview(reader.result);
      thisView.model._avatar = reader.result;
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      thisView._updatePreview("")
      delete this.model._avatar

    }

  },
  _updatePreview: function(src){
    this.$el.find("#preview-post-avatar").attr("src", src).addClass("preview");
  }
})
