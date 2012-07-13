define(["src/me"], function (me) {
  var ArrowEntity = me.ObjectEntity.extend({
    
    init: function (x, y) {
      var settings = {};
      settings.image = "arrow";
      this.parent(x, y, settings);
    },
    
  });

  return ArrowEntity;
});