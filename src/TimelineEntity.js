define(["src/me", "src/config"], function (me, config) {
  
  var LaunchTargetEntity = me.InvisibleEntity.extend({
    
    init: function () {
      this.parent(0, 0, {});
      this.collidable = false;
      this.timePassed = 0;
    },
    
    update: function () {
      if (me.game.HUD.getItemValue("timeline") <= 0) {
        // game over
        return;
      }
      
      this.timePassed += me.timer.tick / me.sys.fps;
      
      if (this.timePassed > config.timelineUnitDuration) {
        this.timePassed -= config.timelineUnitDuration;
        me.game.HUD.updateItemValue("timeline", -1);
      }
    },
    
  });

  return LaunchTargetEntity;
});
