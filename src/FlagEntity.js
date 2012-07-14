define(["src/me", "src/global"], function (me, global) {
  var FlagEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
      settings.spritewidth = 32;

      this.parent(x, y + 32, settings);
    },
    update: function () {
      if (global.ballState != "normal") {
        return false;
      }
      this.parent();
      return true;
    },
  });

  return FlagEntity;
});