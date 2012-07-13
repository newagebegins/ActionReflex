define(
  [
    "src/me",
    "src/config",
    "src/global",
    "src/PlayScreenBorder",
    "src/PlayerEntity"
  ],
  function (
    me,
    config,
    global,
    PlayScreenBorder,
    PlayerEntity
  ) {
      
  var BALL_FLOOR_Y = 192;
      
  var PlayScreen = me.ScreenObject.extend({
    
    onResetEvent: function () {
      me.game.viewport = new me.Viewport(0, 0, 512, 288);
      me.levelDirector.loadLevel(config.startScreen);

      me.game.addHUD(0, 0, config.display.width, config.display.height);
      me.game.HUD.addItem("border", new PlayScreenBorder(0, 0));
      
      if (config.startPosition) {
        this.spawnPosition = { x: config.startPosition.x, y: config.startPosition.y };
      }
      else {
        this.spawnPosition = { x: 32, y: BALL_FLOOR_Y };
      }
      
      this.createBall();
    },
    
    onDestroyEvent: function () {
      me.game.disableHUD();
    },
    
    createBall: function (oldBall) {
      if (oldBall) {
        this.portal(oldBall);
      }
      else if (global.ballState == "suck") {
        this.suck();
      }
      else {
        var tube = me.game.getEntityByName("tube")[0];
        
        if (tube) {
          this.tube(tube);
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
      if (oldBall.right >= 480) {
        this.spawnPosition.x = 32;
      }
      else {
        this.spawnPosition.x = 448;
      }
      this.spawnPosition.y = BALL_FLOOR_Y;
      this.instantiateBall(this.spawnPosition.x, oldBall.pos.y);
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
        })
        .start();
    },
    
    /** @private */
    tube: function (tube) {
      this.instantiateBall(tube.pos.x, tube.pos.y + 10);

      if (config.ballAppearThroughTubeAnimation && global.ballState == "normal") {
        global.ballState = "appearThroughTube";
        this.spawnPosition = { x: tube.pos.x, y: BALL_FLOOR_Y };

        var tubeInitialY = tube.pos.y;
        var tubeMoveDown = new me.Tween(tube.pos).to({y: 79 }, 1200).delay(1000);
        var ballMoveDown = new me.Tween(global.ball.pos).to({y: BALL_FLOOR_Y }, 1200);
        var tubeMoveUp = new me.Tween(tube.pos)
          .to({y: tubeInitialY }, 1200)
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
    
  });

  return PlayScreen;
});