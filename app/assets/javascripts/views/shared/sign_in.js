Sonido.Views.SignIn = Backbone.View.extend({
  initialize: function(options){
    this.listenTo(Sonido.currentUser, "signIn", this.signIn)
  },
  events: {
    "submit form" : "submit"
  },

  template: JST["shared/sign_in"],

  render: function(){
    this.$el.html(this.template())
    return this;
  },

  submit: function(event){
    event.preventDefault()
    var data = $(event.currentTarget).serializeJSON().user;

    Sonido.currentUser.signIn({
      email: data.email,
      password: data.password,
      username: data.username,
      account_type: data.account_type,
      error: function(){
        //maybe read errors later?
        alert("Wrong username/password! Try again.")
      }
    });
  },
  signIn: function(event){
    Backbone.history.navigate("", {trigger: true});
  }
})
