define(["src/me"], function (me) {
  var SplashEntity = me.ObjectEntity.extend({
    init: function (x, y) {
      var settings = {};
      settings.image = "splash";
      settings.spritewidth = 32;

      this.parent(x, y, settings);
    },
  });

  return SplashEntity;
});