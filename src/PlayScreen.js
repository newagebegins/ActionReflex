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
      
  var PlayScreen = me.ScreenObject.extend({
    onResetEvent: function () {
      me.game.viewport = new me.Viewport(0, 0, 512, 288);
      me.levelDirector.loadLevel(config.startScreen);

      me.game.addHUD(0, 0, config.display.width, config.display.height);
      me.game.HUD.addItem("border", new PlayScreenBorder(0, 0));
      
      this.spawnPosition = { x: 32, y: 192 + 16 };
      
      this.createBall();
    },
    onDestroyEvent: function () {
      me.game.disableHUD();
    },
    createBall: function (oldBall) {
      var ball;
      if (oldBall) {
        var x;
        if (oldBall.right >= 480) {
          x = 32;
        }
        else {
          x = 448;
        }
        this.spawnPosition.x = x;
        ball = new PlayerEntity(x, oldBall.pos.y + 16);
        ball.vel = oldBall.vel;
        ball.maxVel = oldBall.maxVel;
        ball.jumping = oldBall.jumping;
        ball.falling = oldBall.falling;
        me.game.add(ball, 1);
        me.game.sort();
      }
      else {
        var tube = me.game.getEntityByName("tube")[0];
        
        if (tube) {
          ball = new PlayerEntity(tube.pos.x, tube.pos.y + 10);
          var BALL_DESTINATION_Y = 192;
          me.game.add(ball, tube.z);
          me.game.sort();

          if (config.ballAppearThroughTubeAnimation && global.ballState == "normal") {
            global.ballState = "appearThroughTube";

            var tubeInitialY = tube.pos.y;
            var tubeMoveDown = new me.Tween(tube.pos).to({y: 79 }, 1200).delay(1000);
            var ballMoveDown = new me.Tween(ball.pos).to({y: BALL_DESTINATION_Y }, 1200);
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
            if (this.spawnPosition) {
              ball.pos.x = this.spawnPosition.x;
              ball.pos.y = this.spawnPosition.y;
            }
            else {
              ball.pos.y = BALL_DESTINATION_Y;
            }
          }
        }
        else {
          ball = new PlayerEntity(this.spawnPosition.x, this.spawnPosition.y);
          me.game.add(ball, 1);
          me.game.sort();
        }
      }
    },
  });

  return PlayScreen;
});