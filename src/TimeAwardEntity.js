define(
  [
    "src/me",
    "src/global",
    "src/ScoreManager"
  ],
  function (
    me,
    global,
    scoreManager
  ) {
  
  var TimeAwardEntity = Object.extend({
    
    init: function () {
      this.timer = 0;
      this.duration = 4;
    },
    
    update: function () {
      if (global.ballState != "exit") {
        return;
      }
      
      if (me.game.HUD.getItemValue("timeline") <= 0) {
        me.state.current().proceedToNextArea();
      }
      else {
        me.game.HUD.updateItemValue("timeline", -1);
        this.timer++;
        if (this.timer >= this.duration) {
          this.timer = 0;
          scoreManager.add(5);
          me.audio.play("timeaward");
        }
      }
    },
    
  });

  return TimeAwardEntity;
});
