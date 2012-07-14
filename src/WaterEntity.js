define(["src/me"], function (me) {
  var WaterEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
      settings.image = "water";
      settings.spritewidth = 16;

      this.parent(x, y, settings);
    },
  });

  return WaterEntity;
});