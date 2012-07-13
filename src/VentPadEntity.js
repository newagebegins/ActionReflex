define(["src/me"], function (me) {
  var VentPadEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
      settings.image = "vent_pad";
      settings.spritewidth = 64;

      this.parent(x, y, settings);
      
      this.collidable = true;
      this.updateColRect(16, 32, -2, 1);
    },
  });

  return VentPadEntity;
});
