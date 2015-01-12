Sonido.Collections.Users = Backbone.Collections.extend({
  url: "api/users",
  model: Sonido.Models.User,
  getOrFetch: function(id){
    var users = this;
    var user = users.get(id);


    if (!user) {
      user = new _thisCollection.model({ id: id});
      user.fetch({
        success: function(user){
          users.add(user);
        }
      });
    } else {
      user.fetch();
    }

    return user;
  }
});
