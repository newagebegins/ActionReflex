define(["src/me"], function (me) {
  var MagnetPadEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
      settings.image = "magnet_pad";
      settings.spritewidth = 48;

      this.parent(x, y, settings);
      
      this.collidable = true;
      this.updateColRect(16, 16, -2, 1);
    },
  });

  return MagnetPadEntity;
});
