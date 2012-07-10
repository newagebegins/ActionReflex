define(["src/me", "src/global"], function (me, global) {
  var FlagEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
      settings.image = "flag";
      settings.spritewidth = 32;

      this.parent(x, y, settings);
    },
    update: function () {
      if (global.ballAppearing) {
        return false;
      }
      this.parent();
      return true;
    },
  });

  return FlagEntity;
});