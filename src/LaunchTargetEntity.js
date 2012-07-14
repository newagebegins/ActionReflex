define(["src/me"], function (me) {
  var LaunchTargetEntity = me.InvisibleEntity.extend({
    init: function (x, y, settings) {
      this.parent(x, y, settings);
      this.collidable = false;
    },
  });

  return LaunchTargetEntity;
});