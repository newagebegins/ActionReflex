define(["src/me"], function (me) {
  var ExitEntity = me.InvisibleEntity.extend({
    init: function (x, y, settings) {
      this.parent(x, y, settings);
    },
  });

  return ExitEntity;
});
