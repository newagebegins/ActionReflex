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
      me.game.viewport = new me.Viewport(32, 32, 512, 288);
      me.levelDirector.loadLevel("scr001");

      me.game.addHUD(0, 0, config.display.width, config.display.height);
      me.game.HUD.addItem("border", new PlayScreenBorder(0, 0));
      
      this.ballAppearAnimation();
    },
    onDestroyEvent: function () {
      me.game.disableHUD();
    },
    ballAppearAnimation: function () {
      global.ballAppearing = true;
      
      var tube = me.game.getEntityByName("tube")[0];
      var tubeInitialY = tube.pos.y;
      
      var ball = new PlayerEntity(tube.pos.x, tube.pos.y + 10);
      me.game.add(ball, tube.z);
      me.game.sort();
      
      var tubeMoveDown = new me.Tween(tube.pos).to({y: 79 }, 1200).delay(1000);
      var ballMoveDown = new me.Tween(ball.pos).to({y: 192 }, 1200);
      var tubeMoveUp = new me.Tween(tube.pos)
        .to({y: tubeInitialY }, 1200)
        .onComplete(function () {
          global.ballAppearing = false;
        });
      
      tubeMoveDown.chain(ballMoveDown);
      ballMoveDown.chain(tubeMoveUp);
      tubeMoveDown.start();
    },
  });

  return PlayScreen;
});