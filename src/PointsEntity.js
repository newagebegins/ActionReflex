define(["src/me", "src/global"], function (me, global) {
  var PointsEntity = me.CollectableEntity.extend({
    init: function (x, y, settings) {
      this.amount = settings.amount;
      
      settings.image = "pts" + settings.amount;
      settings.spritewidth = 32;

      this.parent(x, y, settings);
      
      this.animationspeed = 1;
    },

    onCollision: function () {
      me.game.HUD.updateItemValue("score", this.amount);
      this.collidable = false;
      global.collectedPoints[this.GUID] = true;
      me.game.remove(this);
    }
  });

  return PointsEntity;
});