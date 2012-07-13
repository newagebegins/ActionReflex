define(["src/me", "src/global"], function (me, global) {
  var PointsEntity = me.CollectableEntity.extend({
    init: function (x, y, settings) {
      settings.image = "pts100";
      settings.spritewidth = 32;

      this.parent(x, y, settings);
      
      this.animationspeed = 1;
    },

    onCollision: function () {
      me.game.HUD.updateItemValue("score", 100);
      this.collidable = false;
      global.collectedPoints[this.GUID] = true;
      me.game.remove(this);
    }
  });

  return PointsEntity;
});