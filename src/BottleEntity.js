define(["src/me"], function (me) {
  var BottleEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
      settings.image = "bottle";
      settings.spritewidth = 128;

      this.parent(x, y+32, settings);
      
      this.collidable = false;
    },
  });

  return BottleEntity;
});
