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
    "src/GloveBoxEntity",
    "src/SpikesEntity",
    "src/WaterEntity",
    "src/PitEntity",
  ],
  function (
    me,
    config,
    resources,
    PlayScreen,
    FlagEntity,
    CannonEntity,
    TubeEntity,
    PortalEntity,
    GloveBoxEntity,
    SpikesEntity,
    WaterEntity,
    PitEntity
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
      me.entityPool.add("glove_box", GloveBoxEntity);
      me.entityPool.add("spikes", SpikesEntity);
      me.entityPool.add("water", WaterEntity);
      me.entityPool.add("pit", PitEntity);

      me.input.bindKey(me.input.KEY.LEFT, "left");
      me.input.bindKey(me.input.KEY.RIGHT, "right");
      me.input.bindKey(me.input.KEY.UP, "jump");
      
      me.debug.renderHitBox = config.debug;

      me.state.change(me.state.PLAY);
    },
  };

  return app;
});