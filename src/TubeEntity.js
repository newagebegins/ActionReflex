define(["src/me"], function (me) {
  var TubeEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
      settings.image = "tube";
      settings.spritewidth = 32;

      this.parent(x, y, settings);
    },
  });

  return TubeEntity;
});