define(["src/me", "src/config", "src/global"], function (me, config, global) {
  
  var TimelineEntity = Object.extend({
    
    init: function () {
      this.timePassed = 0;
      this.name = "timeline";
    },
    
    update: function () {
      if (global.ballState != "normal") {
        return false;
      }
      
      if (me.game.HUD.getItemValue("timeline") <= 0) {
        me.state.current().calculateCompleted();
        me.state.change(me.state.GAMEOVER);
        return false;
      }
      
      this.timePassed += me.timer.tick / me.sys.fps;
      
      if (this.timePassed > config.timelineUnitDuration) {
        var decrement = this.timePassed / config.timelineUnitDuration;
        me.game.HUD.updateItemValue("timeline", -decrement);
        this.timePassed = 0;
      }
      
      return false;
    },
    
    penalty: function () {
      me.game.HUD.updateItemValue("timeline", -config.timePenalty);
    },
    
  });

  return TimelineEntity;
});
