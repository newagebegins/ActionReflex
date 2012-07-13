define(["src/me"], function (me) {
  var VentExitEntity = me.InvisibleEntity.extend({
    init: function (x, y, settings) {
      this.parent(x, y, settings);
    },
  });

  return VentExitEntity;
});
