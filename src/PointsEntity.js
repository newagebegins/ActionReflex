define(["src/me", "src/config", "src/global"], function (me, config, global) {
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
      this.updateBuoy();
      this.collidable = false;
      global.collectedPoints[this.GUID] = true;
      me.game.remove(this);
    },
    
    updateBuoy: function () {
      me.gamestat.updateValue("ptsNextBuoy", -this.amount);
      if (me.gamestat.getItemValue("ptsNextBuoy") <= 0) {
        me.game.HUD.updateItemValue("buoy", 1);
        me.gamestat.setValue("ptsNextBuoy", config.bouyCost + me.gamestat.getItemValue("ptsNextBuoy"));
      }
    },
    
  });

  return PointsEntity;
});