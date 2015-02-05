Sonido.Views.UsersForm = Backbone.View.extend({
  initialize: function(options){
    this.listenTo(this.model, 'sync change', this.render)
  },
  template: JST["users/userform"],
  events: {
    "submit form": "submit",
    "change #input-post-image" : "preview",
    "change .accounttype": "notifyUser"
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
        var errors = response.responseJSON
        for(var errormsg in errors) {
          if (errors[errormsg]) {
            thisView.$el.find("#" + String(errormsg) + "errors").html(errors[errormsg][0])
          }
        }
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
  notifyUser: function(event){
    event.preventDefault()
    if ($(event.currentTarget).val() === "listener") {
      this.$el.find("#account_typeerrors").html("Only artists can upload songs!")
    }
  },
  _updatePreview: function(src){
    this.$el.find("#preview-post-avatar").attr("src", src).addClass("preview");
  }
})
