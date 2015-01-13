Sonido.Routers.Router = Backbone.Router.extend({
  initialize: function(options) {
    this.$content = options.$content
    this.collection = new Sonido.Collections.Users();
    this.collection.fetch();
  },
  routes: {
    "" : "home",
    "users/new" : "newUser",
    "session/new" : "signIn"
  },
  newUser: function(){

  },
  home: function(){

  },
  _requireSignedIn: function(signinView){
    if (!Sonido.currentUser.isSignedIn()){
      signinView = signinView || this._goHome.bind(this);
      signinView();
      return false;
    }

    return true;
  },
  _goHome : function(){
    Backbone.history.navigate("", {trigger: true});
  },

  _swapView: function(view){
    this._currentView && this._currentView.remove()
    this._currentView = view;
    this.$content.html(view.render().$el)
  }
})
