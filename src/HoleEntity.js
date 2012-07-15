define(["src/me"], function (me) {
  
  var HoleEntity = me.InvisibleEntity.extend({
    
    init: function (x, y, settings) {
      this.parent(x, y, settings);
      this.updateColRect(2, 30, 1, 10);
    },
    
  });

  return HoleEntity;
});
