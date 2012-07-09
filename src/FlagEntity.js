define(["src/me"], function (me) {
  var FlagEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
      settings.image = "flag";
      settings.spritewidth = 32;

      this.parent(x, y, settings);
    },
  });

  return FlagEntity;
});