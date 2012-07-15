define(["src/me", "src/config", "src/global"], function (me, config, global) {
  
  var LaunchTargetEntity = me.InvisibleEntity.extend({
    
    init: function () {
      this.parent(0, 0, {});
      this.collidable = false;
      this.timePassed = 0;
    },
    
    update: function () {
      if (global.ballState != "normal") {
        return false;
      }
      
      if (me.game.HUD.getItemValue("timeline") <= 0) {
        me.state.change(me.state.GAMEOVER);
        return false;
      }
      
      this.timePassed += me.timer.tick / me.sys.fps;
      
      if (this.timePassed > config.timelineUnitDuration) {
        this.timePassed -= config.timelineUnitDuration;
        me.game.HUD.updateItemValue("timeline", -1);
      }
      
      return false;
    },
    
  });

  return LaunchTargetEntity;
});
