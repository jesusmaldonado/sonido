Sonido.Views.SignIn = Backbone.View.extend({
  initialize: function (options){
    this.callback = options.callback;
    this.listenTo(Sonido.currentUser, "signIn", this.signInCallback);
    this.user = options.user
  },
  events: {
  "submit form": "submit",
  "click .demouser": "demo"
  },
  template: JST["shared/sign_in"],
  render: function(){
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
  },
  demo: function(event){
    event.preventDefault()
    var form_attrs = { user: {
							username: "demoUser",
              email: "demo@demo.com",
							password: "demodemo"
						}}
    $.ajax({
      url: "api/users/demo",
			method: "get",
			data: form_attrs,
			success: function (resp) {
				Sonido.currentUser.set(resp);
        Sonido.currentUser.trigger("sync")
				Backbone.history.navigate("", {trigger: true})
			}
    })
  }
})