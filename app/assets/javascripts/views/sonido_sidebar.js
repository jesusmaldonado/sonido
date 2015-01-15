Sonido.Views.Sidebar = Backbone.View.extend({
  template: JST["sidebar"],
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render)
  },
  render: function(){
    var sidebarContents = this.template({currentUser: this.model})
    this.$el.html(sidebarContents);
    return this;
  }
})
