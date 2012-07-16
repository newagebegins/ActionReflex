define(
  [
    "src/me",
    "src/config",
    "src/util",
    "src/resources",
    "src/PlayScreen",
    "src/FlagEntity",
    "src/CannonEntity",
    "src/TubeEntity",
    "src/PortalEntity",
    "src/GloveBoxEntity",
    "src/SpikesEntity",
    "src/WaterEntity",
    "src/PitTriggerEntity",
    "src/VentPadEntity",
    "src/VentEntity",
    "src/VentExitEntity",
    "src/BottleEntity",
    "src/FireEntity",
    "src/PointsEntity",
    "src/MagnetPadEntity",
    "src/MagnetEntity",
    "src/ArrowEntity",
    "src/LauncherEntity",
    "src/LaunchTargetEntity",
    "src/WaterTriggerEntity",
    "src/TitleScreen",
    "src/BouncingBallEntity",
    "src/TitleScreenTextEntity",
    "src/GameOverScreen",
    "src/StartEntity",
    "src/ExitEntity",
    "src/FroggyEntity",
    "src/HoleEntity",
    "src/CongratulationsScreen",
  ],
  function (
    me,
    config,
    util,
    resources,
    PlayScreen,
    FlagEntity,
    CannonEntity,
    TubeEntity,
    PortalEntity,
    GloveBoxEntity,
    SpikesEntity,
    WaterEntity,
    PitTriggerEntity,
    VentPadEntity,
    VentEntity,
    VentExitEntity,
    BottleEntity,
    FireEntity,
    PointsEntity,
    MagnetPadEntity,
    MagnetEntity,
    ArrowEntity,
    LauncherEntity,
    LaunchTargetEntity,
    WaterTriggerEntity,
    TitleScreen,
    BouncingBallEntity,
    TitleScreenTextEntity,
    GameOverScreen,
    StartEntity,
    ExitEntity,
    FroggyEntity,
    HoleEntity,
    CongratulationsScreen
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
      me.state.set(me.state.MENU, new TitleScreen());
      me.state.set(me.state.PLAY, new PlayScreen());
      me.state.set(me.state.GAMEOVER, new GameOverScreen());
      me.state.set(me.state.GAME_END, new CongratulationsScreen());

      me.entityPool.add("flag", FlagEntity);
      me.entityPool.add("cannon", CannonEntity);
      me.entityPool.add("tube", TubeEntity);
      me.entityPool.add("portal", PortalEntity);
      me.entityPool.add("glove_box", GloveBoxEntity);
      me.entityPool.add("spikes", SpikesEntity);
      me.entityPool.add("water", WaterEntity);
      me.entityPool.add("pit_trigger", PitTriggerEntity);
      me.entityPool.add("vent_pad", VentPadEntity);
      me.entityPool.add("vent", VentEntity);
      me.entityPool.add("vent_exit", VentExitEntity);
      me.entityPool.add("bottle", BottleEntity);
      me.entityPool.add("fire", FireEntity);
      me.entityPool.add("points", PointsEntity);
      me.entityPool.add("magnet_pad", MagnetPadEntity);
      me.entityPool.add("magnet", MagnetEntity);
      me.entityPool.add("arrow", ArrowEntity);
      me.entityPool.add("launcher", LauncherEntity);
      me.entityPool.add("launch_target", LaunchTargetEntity);
      me.entityPool.add("water_trigger", WaterTriggerEntity);
      me.entityPool.add("bouncing_ball", BouncingBallEntity);
      me.entityPool.add("title_screen_text", TitleScreenTextEntity);
      me.entityPool.add("start", StartEntity);
      me.entityPool.add("exit", ExitEntity);
      me.entityPool.add("froggy", FroggyEntity);
      me.entityPool.add("hole", HoleEntity);

      me.input.bindKey(me.input.KEY.LEFT, "left");
      me.input.bindKey(me.input.KEY.RIGHT, "right");
      me.input.bindKey(me.input.KEY.UP, "jump");
      
      me.debug.renderHitBox = config.debug;
      
      me.gamestat.add("score", config.initialScore);
      me.gamestat.add("completed", config.initialCompleted);

      me.state.change(config.initialScreen);
    },
  };

  return app;
});