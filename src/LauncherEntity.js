define(["src/me"], function (me) {
  var LauncherEntity = me.InvisibleEntity.extend({
    init: function (x, y, settings) {
      this.parent(x, y, settings);
      this.updateColRect(16, 1, -2, 1);
    },
  });

  return LauncherEntity;
});