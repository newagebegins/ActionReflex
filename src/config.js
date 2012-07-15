define(function () {
  var config = {
    debug: false,
    display: {
      width: 512,
      height: 384,
    },
    showTitleScreen: true,
    ballAppearThroughTubeAnimation: true,
    startScreen: "scr001",

  //  startPosition: {x:381, y:192},
    startPosition: null,


    bouyInitialCount: 1,
    bouyCost: 500,

    timelineWidth: 256, // in px
    timelineDuration: 432, // in sec
  };
  
  config.timelineUnitDuration = config.timelineDuration / config.timelineWidth;
  
  return config;
});