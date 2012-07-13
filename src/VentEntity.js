define(["src/me"], function (me) {
  var VentEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
      settings.image = "vent";
      settings.spritewidth = 64;

      this.parent(x, y+64, settings);
      
      this.to = settings.to;
      
      this.addAnimation("default", [0]);
      this.addAnimation("suck", [0,1,2,3,4,0]);
      this.setCurrentAnimation("default");
    },
  });

  return VentEntity;
});
