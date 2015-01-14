Sonido.Views.Header = Backbone.View.extend({
  template: JST["shared/header"],
  tagName: "header",
  className: "header",
  render: function(){
    var headerContents = this.template({ currentUser: this.model });
    this.$el.html(headerContents)
    return this;
  }
})
