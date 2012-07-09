define(["src/me", "src/config", "src/resources", "src/PlayScreen", "src/PlayerEntity"], function (me, config, resources, PlayScreen, PlayerEntity) {
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

      me.entityPool.add("player", PlayerEntity);

      me.input.bindKey(me.input.KEY.LEFT, "left");
      me.input.bindKey(me.input.KEY.RIGHT, "right");
      me.input.bindKey(me.input.KEY.UP, "jump");

      me.state.change(me.state.PLAY);
    },
  };

  return app;
});