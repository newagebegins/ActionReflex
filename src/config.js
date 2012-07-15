define(["src/me"], function (me) {
  
  var config = {
    debug: false,
    display: {
      width: 512,
      height: 384,
    },
    initialScreen: me.state.MENU,
    ballAppearThroughTubeAnimation: true,
    startScreen: "scr001",

  //  startPosition: {x:381, y:192},
    startPosition: null,
    
    initialScore: 0,
    initialCompleted: 0,

    bouyInitialCount: 0,
    bouyCost: 500,

    timelineWidth: 256, // in px
    timelineDuration: 432, // in sec
  };
  
  config.timelineUnitDuration = config.timelineDuration / config.timelineWidth;
  
  return config;
  
});