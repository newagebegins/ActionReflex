define(["src/me", "src/global", "src/ScoreManager"], function (me, global, scoreManager) {
  var PointsEntity = me.CollectableEntity.extend({
    
    init: function (x, y, settings) {
      this.amount = settings.amount;
      
      settings.image = "pts" + settings.amount;
      settings.spritewidth = 32;

      this.parent(x, y, settings);
      
      this.animationspeed = 1;
    },

    onCollision: function () {
      scoreManager.add(this.amount);
      this.collidable = false;
      global.collectedPoints[this.GUID] = true;
      me.game.remove(this);
      me.audio.play("points");
    },
    
  });

  return PointsEntity;
});