Sonido.Collections.Users = Backbone.Collection.extend({
  url: "api/users",
  model: Sonido.Models.User,
  getOrFetch: function(id){
    var user = this.get(id);
    var _usersCollection = this;
    if (!user){
      var user = new Sonido.Models.User({id: id});
      user.fetch({
        success: function(){
          _usersCollection.add(user);
        }
      });
    } else {
      user.fetch();
    }
    return user;
  }
})
