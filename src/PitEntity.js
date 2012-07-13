define(["src/me"], function (me) {
  var PitEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
      settings.image = "pit";
      settings.spritewidth = 48;

      this.parent(x, y, settings);
      
      this.collidable = true;
    },
  });

  return PitEntity;
});