define(["src/me"], function (me) {
  
  var TitleScreen = me.ScreenObject.extend({

    onResetEvent: function () {
      me.input.bindKey(me.input.KEY.ENTER, "enter", true);
      me.levelDirector.loadLevel("title");
      me.game.add(this, 999);
      me.game.sort();
    },

    update: function () {
      if (me.input.isKeyPressed('enter')) {
        me.state.change(me.state.PLAY);
      }
      return false;
    },

    onDestroyEvent: function () {
      me.input.unbindKey(me.input.KEY.ENTER);
    },

  });

  return TitleScreen;
});
