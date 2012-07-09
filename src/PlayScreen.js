define(["src/me", "src/config", "src/PlayScreenBorder"], function (me, config, PlayScreenBorder) {
  var PlayScreen = me.ScreenObject.extend({
    onResetEvent: function () {
      me.game.viewport = new me.Viewport(32, 32, 512, 288);
      me.levelDirector.loadLevel("scr001");

      me.game.addHUD(0, 0, config.display.width, config.display.height);
      me.game.HUD.addItem("border", new PlayScreenBorder(0, 0));
    },
    onDestroyEvent: function () {
      me.game.disableHUD();
    },
  });

  return PlayScreen;
});