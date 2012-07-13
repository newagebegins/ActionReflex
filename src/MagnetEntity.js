define(["src/me"], function (me) {
  var MagnetEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
      settings.image = "magnet";
      settings.spritewidth = 48;

      this.parent(x, y+32, settings);
    },
  });

  return MagnetEntity;
});
