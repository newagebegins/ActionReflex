define(["src/me"], function (me) {
  var SpikesEntity = me.ObjectEntity.extend({
    init: function (x, y) {
      var settings = {};
      settings.image = "spikes";
      settings.spritewidth = 32;

      this.parent(x, y + 16, settings);
      
      this.collidable = true;
      this.type = "lethal";
    },
  });

  return SpikesEntity;
});