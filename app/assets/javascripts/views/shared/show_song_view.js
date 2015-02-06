// rendering code inspired from
// http://www.patrick-wied.at/blog/how-to-create-audio-visualizations-with-javascript-html
// amazing stuff

var config = {
  'initial': (function() {
				var barsArr = [],
					initialized = false,
					barsEl;

				var height = 0;

				var init = function(config) {
					var count = config.count;
					var width = config.width;
					var barWidth = (width/count) >> 0;
					height = config.height;

					barsEl = document.getElementById('bars');
					for(var i = 0; i < count; i++ ){
						var nunode = document.createElement('div');
						nunode.classList.add('bar');
						nunode.style.width = barWidth + 'px';
						nunode.style.left = (barWidth * i *2) + 'px';
						barsArr.push(nunode);
						barsEl.appendChild(nunode);
					}
					initialized = true;
				};
				var max = 256;

				var renderFrame = function(frequencyData) {

          for(var i = 0; i < barsArr.length; i++) {
						var bar = barsArr[i];

						bar.style.height = ((frequencyData[i]/max)*height + 'px');
					}


				};


				return {
					init: init,
					isInitialized: function() {
						return initialized;
					},
					renderFrame: renderFrame
				}
			})()
}

Sonido.Visualization = function (config) {
        var audio,
					audioStream,
					analyser,
					source,
					audioCtx,
					canvasCtx,
					frequencyData,
					running = false,
					renderer = config.renderer,
					width = config.width || 360,
					height = config.height || 100;

				var init = function() {
					audio = $("#Audio")[0]
					audioCtx = new AudioContext();
					analyser = audioCtx.createAnalyser();
					source =  audioCtx.createMediaElementSource(audio);
					source.connect(analyser);
					analyser.connect(audioCtx.destination);
					analyser.fftSize = 64;
					frequencyData = new Uint8Array(analyser.frequencyBinCount);
					renderer.init({
						count: analyser.frequencyBinCount,
						width: width,
						height: height
					});
				};
				this.start = function() {
					audio.play();
					running = true;
					renderFrame();
				};
				this.stop = function() {
					running = false;
					audio.pause();
				};
				this.setRenderer = function(r) {
					if (!r.isInitialized()) {
						r.init({
							count: analyser.frequencyBinCount,
							width: width,
							height: height
						});
					}
					renderer = r;
				};
				this.isPlaying = function() {
					return running;
				}

				var renderFrame = function() {
					analyser.getByteFrequencyData(frequencyData);
          console.log(audio.duration)
          $(".timeLeft").html(audio.currentTime/audio.duration)
          console.log(audio.volume)
					renderer.renderFrame(frequencyData);
					if (running) {
						requestAnimationFrame(renderFrame);
					}
				};

				init();

}


Sonido.Views.ShowSongView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, 'sync change', this.render)
    this.visualization = null
    Sonido.currentUser.playlists().fetch()
  },
  template: JST["songs/show"],
  events: {
    "click .destroySong" : "destroySong",
    "click .playSong" : "pressPlay",
    "click .pauseSong" : "pauseSong",
    "click .likeSong" : "likeSong",
    "click .unlikeSong" : "unlikeSong",
    "click .addToPlaylist" : "addToPlaylist",
    "click .close" : "close"
  },
  render: function(){
    var showContents = this.template({song: this.model})
    this.$el.html(showContents);
    this.renderButton();
    return this;
  },
  renderButton: function(){
    var likeButton = this.$el.find(".songLikeStatus")

    var songLike = this.model.songLike()
    var likedStatus = this.model.songLike().get("id");
    if (!likedStatus) {
      likeButton.html("Like this song!");
      likeButton.toggleClass("unliked");
    } else {
      likeButton.html("Unlike this song!");
      likeButton.toggleClass("liked");
    }
  },
  pressPlay: function(event){
    if (!this.visualization){
      this.visualization = new Sonido.Visualization({renderer: config['initial']});
      this.visualization.setRenderer(config['initial']);
    }

    this.visualization.start();
    $(event.currentTarget).html("=").removeClass("playSong").addClass("pauseSong")

  },
  pauseSong: function(event){
    this.visualization.stop();
    $(event.currentTarget).html(">").removeClass("pauseSong").addClass("playSong")
  },
  likeSong: function(event) {
      var songId = $(event.currentTarget).data("song-id");
      var data = {song_like: {song_id: songId}};
      var button = $(event.currentTarget)
      var song = this.model
        $.ajax({
          url: "api/song_likes",
          type: "POST",
          dataType: "json",
          data: data,
          success: function(){
            button.removeClass("likeSong")
            button.addClass("unlikeSong")
            song.songLike()
          },
          error: function(){

          }
        });

    },
  unlikeSong: function(event) {
    var songId = $(event.currentTarget).data("song-id");
    var data = {song_id: songId};
    var button = $(event.currentTarget)
    var song = this.model
      $.ajax({
        url: "api/song_likes/removeSongLike",
        type: "DELETE",
        dataType: "json",
        data: data,
        success: function(){
          button.removeClass("unlikeSong")
          button.addClass("likeSong")
          song.set({liked: "notliked"});
        },
        error: function(){

        }
      });
    },
  addToPlaylist: function(event){
      event.preventDefault();
      var songId = this.model.id;
      var song = this.model
      var container = this.$el.find(".containerAddPlaylist" + songId);
      var formContainer = this.$el.find(".addPlaylistForm" + songId);

      var playlistAddView = new Sonido.Views.PlaylistAdd({
        song: song,
        collection: Sonido.currentUser.playlists(),
        container: container,
        formContainer: formContainer})
      this.playlistView = playlistAddView
      playlistAddView.render();
      var button = $(event.currentTarget)
      button.html("X").removeClass("addToPlaylist").addClass("close")
    },
  close: function(event){
    var button = $(event.currentTarget)
    button.html("+").removeClass("close").addClass("addToPlaylist")
    this.playlistView && this.playlistView.remove()
  },
  remove: function(){
    this.playlistView && this.playlistView.remove()
    Backbone.view.prototype.remove.call(this)
  }
})
