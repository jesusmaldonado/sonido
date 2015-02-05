Sonido.Views.SignIn = Backbone.View.extend({
  initialize: function (options){
    this.callback = options.callback;
    this.listenTo(Sonido.currentUser, "signIn", this.signInCallback);
    this.user = options.user
  },
  events: {
  "submit form": "submit"
  },
  template: JST["shared/sign_in"],
  render: function(){
    console.log("hi")
    this.$el.html(this.template({user: this.user}));
    return this;
  },
  submit: function(event){
    event.preventDefault()
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON().user;
    Sonido.currentUser.signIn({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      success: function(){
        Backbone.history.navigate("", {trigger: true})
      },
      error: function(){
        alert("Wrong username/password combination. Please try again.");
      }
    })
  }
})
