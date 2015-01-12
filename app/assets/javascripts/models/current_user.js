Sonido.Models.CurrentUser = Sonido.Models.User.extend({
  url: "api/session",
  initialize: function(options) {
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  isSignedIn: function() {
    return !this.isNew();
  },
  signIn: function(opt) {
    var potentialUser = this;
    var credentials = {
      "user[username]" : options.username,
      "user[email]" : options.email,
      "user[password]" : options.password
    };


    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function(data) {
        potentialUser.set(data);
        opt.success && opt.success();
      },
      error: function() {
        opt.error && opt.error();
      }
    });

  },

  signOut: function(opt) {
    var model = this;
    $.ajax({
      url: this.url,
      type: "DELETE",
      dataType: "json",
      success: function(data) {
        model.clear();
        opt.success && opt.success();
      }
    });
  },

  fireSessionEvent: function() {
    if (this.isSignedIn()) {
      this.trigger('signIn');
      console.log("sign in triggered?")
    } else {
      this.trigger('signOut');
      console.log('Sign out triggered?')
    }
  }
});
