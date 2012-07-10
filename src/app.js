define(
  [
    "src/me",
    "src/config",
    "src/resources",
    "src/PlayScreen",
    "src/FlagEntity",
    "src/CannonEntity",
    "src/TubeEntity",
    "src/PortalEntity",
  ],
  function (
    me,
    config,
    resources,
    PlayScreen,
    FlagEntity,
    CannonEntity,
    TubeEntity,
    PortalEntity
  ) {
    
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

      me.entityPool.add("flag", FlagEntity);
      me.entityPool.add("cannon", CannonEntity);
      me.entityPool.add("tube", TubeEntity);
      me.entityPool.add("portal", PortalEntity);

      me.input.bindKey(me.input.KEY.LEFT, "left");
      me.input.bindKey(me.input.KEY.RIGHT, "right");
      me.input.bindKey(me.input.KEY.UP, "jump");
      
//      me.debug.renderHitBox = true;

      me.state.change(me.state.PLAY);
    },
  };

  return app;
});