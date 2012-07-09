define(["src/me", "src/config", "src/resources", "src/PlayScreen"], function (me, config, resources, PlayScreen) {
  var app = {
    onload: function () {
      document.getElementById("info").style.width = config.display.width + "px";
      me.video.init("app", config.display.width, config.display.height, false, 1.0);
      me.loader.onload = this.loaded.bind(this);
      me.loader.preload(resources);
      me.state.change(me.state.LOADING);
    },
    loaded: function () {
      me.state.set(me.state.PLAY, new PlayScreen());
      me.state.change(me.state.PLAY);
    },
  };

  return app;
});