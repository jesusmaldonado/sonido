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
          console.log(audio)
					renderer.renderFrame(frequencyData);
					if (running) {
						requestAnimationFrame(renderFrame);
					}
				};

				init();

}


Sonido.Views.ShowSongView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.model, 'sync', this.render)
    this.listenTo(this.model.songLike(), 'sync destroy', this.render)
    this.visualization = null
  },
  template: JST["songs/show"],
  events: {
    // "click .destroySong" : "destroySong",
    "click .unliked" : "createLike",
    "click .liked" : "destroyLike",
    "click .playSong" : "pressPlay",
    "click .pauseSong" : "pauseSong"
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
  createLike: function(event){
    var song_id = $(event.currentTarget).data("id");
    var likeButton = this.$el.find(".songLikeStatus");

    var newLike = new Sonido.Models.SongLike({song_id: song_id})
    var _currentShowView = this;
    var currentSong = this.model;

    newLike.save({}, {
      success: function(newLike) {
        currentSong._songLike = newLike;
        likeButton.toggleClass("unliked");
        _currentShowView.render();
      }
    })
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
  destroyLike: function() {
    var likeButton = this.$el.find(".songLikeStatus")
    var _currentShowView = this;
    var currentSong = this.model;

    currentSong.songLike().destroy({
      success: function(){
        currentSong._songLike = null;
        likeButton.toggleClass("liked");
        _currentShowView.render();
      }
    })
  }
})
