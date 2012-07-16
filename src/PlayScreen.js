define(
  [
    "src/me",
    "src/config",
    "src/global",
    "src/PlayScreenBorder",
    "src/PlayerEntity",
    "src/Score",
    "src/Speed",
    "src/BuoyHUD",
    "src/HammerHUD",
    "src/KeyHUD",
    "src/TimelineHUD",
    "src/TimelineEntity",
  ],
  function (
    me,
    config,
    global,
    PlayScreenBorder,
    PlayerEntity,
    Score,
    Speed,
    BuoyHUD,
    HammerHUD,
    KeyHUD,
    TimelineHUD,
    TimelineEntity
  ) {
      
  var BALL_FLOOR_Y = 192;
      
  var PlayScreen = me.ScreenObject.extend({
    
    onResetEvent: function () {
      global.collectedPoints = {};
      global.storedFroggies = {};
      this.loadLevel(config.startScreen);

      me.game.addHUD(0, 0, config.display.width, config.display.height);
      me.game.HUD.addItem("border", new PlayScreenBorder(0, 0));
      
      me.game.HUD.addItem("score", new Score(363, 384));
      me.game.HUD.setItemValue("score", me.gamestat.getItemValue("score"));
      
      me.game.HUD.addItem("speed", new Speed(16, 351));
      
      me.game.HUD.addItem("buoy", new BuoyHUD(336, 288));
      me.game.HUD.setItemValue("buoy", config.bouyInitialCount);
      me.gamestat.add("ptsNextBuoy", config.bouyCost);
      
      me.game.HUD.addItem("hammer", new HammerHUD(416, 288));
      me.game.HUD.setItemValue("hammer", config.hammerInitialCount);
      me.gamestat.add("ptsNextHammer", config.hammerCost);
      
      me.game.HUD.addItem("key", new KeyHUD(464, 288));
      me.game.HUD.setItemValue("key", config.keyInitialCount);
      me.gamestat.add("ptsNextKey", config.keyCost);
      
      me.game.HUD.addItem("timeline", new TimelineHUD(16, 304));
      me.game.HUD.setItemValue("timeline", config.timelineWidth);
      
      
      me.gamestat.setValue("score", config.initialScore);
      me.gamestat.setValue("completed", config.initialCompleted);
      
      if (config.startPosition) {
        this.spawnPosition = {x: config.startPosition.x, y: config.startPosition.y};
      }
      else {
        this.spawnPosition = {x: 32, y: BALL_FLOOR_Y};
      }
      
      this.resetLevel();
    },
    
    resetLevel: function (ball) {
      this.createBall(ball);
      this.createTimeline();
    },
    
    onDestroyEvent: function () {
      me.game.disableHUD();
    },
    
    loadLevel: function (level) {
      me.levelDirector.loadLevel(level);
      this.removeCollectedPoints();
    },
    
    reloadLevel: function () {
      me.levelDirector.reloadLevel();
      this.removeCollectedPoints();
    },
    
    /** @private */
    removeCollectedPoints: function () {
      if (global.collectedPoints.length == 0) {
        return;
      }
      var points = me.game.getEntityByName("points");
      for (var i in points) {
        if (global.collectedPoints[points[i].GUID]) {
          me.game.remove(points[i]);
        }
      }
    },
    
    createBall: function (oldBall) {
      if (oldBall) {
        this.portal(oldBall);
      }
      else if (global.ballState == "suck") {
        this.suck();
      }
      else {
        var start = me.game.getEntityByName("start")[0];
        
        if (start) {
          this.start();
        }
        else {
          this.instantiateBall(this.spawnPosition.x, this.spawnPosition.y);
        }
      }
    },
    
    /** @private */
    instantiateBall: function (x, y) {
      global.ball = new PlayerEntity(x, y);
      me.game.add(global.ball, 1);
      me.game.sort();
    },
    
    /** @private */
    portal: function (oldBall) {
      var x, y;
      
      if (oldBall.right >= 480) {
        x = this.spawnPosition.x = 32;
        y = oldBall.pos.y;
      }
      else if (oldBall.left <= 32) {
        x = this.spawnPosition.x = 448;
        y = oldBall.pos.y;
      }
      else if (oldBall.bottom >= 256) {
        if (me.game.collisionMap.getTile(48, 192)) {
          this.spawnPosition.x = 448;
        }
        else {
          this.spawnPosition.x = 32;
        }
        x = oldBall.pos.x;
        y = 32;
      }
      else if (oldBall.top <= 32) {
        x = oldBall.pos.x;
        y = 224;
      }
      
      this.spawnPosition.y = BALL_FLOOR_Y;
      
      this.instantiateBall(x, y);
      
      global.ball.vel = oldBall.vel;
      global.ball.maxVel = oldBall.maxVel;
      global.ball.jumping = oldBall.jumping;
      global.ball.falling = oldBall.falling;
    },
    
    /** @private */
    suck: function () {
      var ventExit = me.game.getEntityByName("vent_exit")[0];
      this.spawnPosition.x = ventExit.pos.x;
      this.spawnPosition.y = BALL_FLOOR_Y;
      this.instantiateBall(ventExit.pos.x, 0);
      new me.Tween(global.ball.pos)
        .to({y: 64}, 1000)
        .onComplete(function () {
          global.ballState = "normal";
          global.listenBallKeys = true;
        })
        .start();
    },
    
    /** @private */
    start: function () {
      var tube = me.game.getEntityByName("tube")[0];
      this.instantiateBall(tube.pos.x, tube.pos.y + 10);

      if (config.ballAppearThroughTubeAnimation && global.ballState == "normal") {
        global.ballState = "appearThroughTube";
        this.spawnPosition = {x: tube.pos.x, y: BALL_FLOOR_Y};

        var tubeInitialY = tube.pos.y;
        var tubeMoveDown = new me.Tween(tube.pos).to({y: 79}, 1200).delay(1000);
        var ballMoveDown = new me.Tween(global.ball.pos).to({y: BALL_FLOOR_Y}, 1200);
        var tubeMoveUp = new me.Tween(tube.pos)
          .to({y: tubeInitialY}, 1200)
          .onComplete(function () {
            global.ballState = "normal";
          });

        tubeMoveDown.chain(ballMoveDown);
        ballMoveDown.chain(tubeMoveUp);
        tubeMoveDown.start();
      }
      else {
        global.ball.pos.x = this.spawnPosition.x;
        global.ball.pos.y = this.spawnPosition.y;
      }
    },
    
    createTimeline: function () {
      var timeline = new TimelineEntity();
      me.game.add(timeline, 999);
      me.game.sort();
    },
    
    proceedToNextArea: function () {
      global.ballState = "normal";
      var exit = me.game.getEntityByName("exit")[0];
      this.loadLevel(exit.to);
      me.game.HUD.setItemValue("timeline", config.timelineWidth);
      this.resetLevel();
    },
    
  });

  return PlayScreen;
});