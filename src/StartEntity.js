define(["src/me"], function (me) {
  var StartEntity = me.InvisibleEntity.extend({
    init: function (x, y, settings) {
      this.parent(x, y, settings);
      this.collidable = false;
    },
  });

  return StartEntity;
});
