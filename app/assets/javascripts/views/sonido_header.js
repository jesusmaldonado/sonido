Sonido.Views.Header = Backbone.View.extend({
  template: JST["shared/header"],
  initialize: function(options){
    this.listenTo(Sonido.currentUser, "signIn signOut", this.render)
  },
  events: {
    "click .logout" : "logout"
  },
  tagName: "header",
  className: "header",
  render: function(){
    var headerContents = this.template({ currentUser: this.model });
    this.$el.html(headerContents)
    return this;
  },
  logout: function(event){
    event.preventDefault();
    BackboneAuthDemo.currentUser.signOut({
      success: function(){
        console.log("logged out")
      }
    });
  }
})
