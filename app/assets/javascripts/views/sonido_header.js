Sonido.Views.Header = Backbone.View.extend({
  template: JST["shared/header"],
  initialize: function(options){
    this.listenTo(Sonido.currentUser, "signIn signOut", this.render)

  },
  tagName: "header",
  className: "header",
  render: function(){
    var headerContents = this.template({ currentUser: this.model });
    this.$el.html(headerContents)
    return this;
  }
})
