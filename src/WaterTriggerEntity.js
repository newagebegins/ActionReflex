define(["src/me"], function (me) {
  var WaterTriggerEntity = me.InvisibleEntity.extend({
    init: function (x, y, settings) {
      this.parent(x, y, settings);
      this.updateColRect(16, this.width - 32, 15, 1);
    },
  });

  return WaterTriggerEntity;
});