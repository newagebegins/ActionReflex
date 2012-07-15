define(
  [
    "src/me",
    "src/config",
    "src/FlashFont",
  ],
  function (
    me,
    config,
    FlashFont
  ) {
  
  var GameOverScreen = me.ScreenObject.extend({
    
    init: function () {
      this.parent(true);
      
      this.font = null;
      this.flashFont = null;
      this.borderImage = null;
    },

    onResetEvent: function () {
      if (!this.font) {
        this.font = new me.Font('editundo', config.fontSize, '#00c5c5');
        this.flashFont = new FlashFont('editundo', config.fontSize);
        this.borderImage = me.loader.getImage("border");
      }
      
      me.input.bindKey(me.input.KEY.ENTER, "enter", true);
    },

    update: function () {
      if (me.input.isKeyPressed('enter')) {
        me.state.change(me.state.MENU);
      }
      this.flashFont.update();
      return true;
    },
    
    draw: function (context) {
      me.video.clearSurface(context, "#000000");
      context.drawImage(this.borderImage, 0, 0);
      
      this.flashFont.draw(context, "GAME OVER", 190, 70);
      
      this.font.color = "#00c5c5";
      var score = ("" + me.gamestat.getItemValue("score")).lpad("0", 5);
      this.font.draw(context, "YOU SCORED       " + score, 100, 130);
      
      this.font.color = "#c5c500";
      var completed = ("" + me.gamestat.getItemValue("completed")).lpad("0", 2);
      this.font.draw(context, "YOU COMPLETED    " + completed, 100, 185);
      
      this.font.color = "#c5c5c5";
      this.font.draw(context, "%", 390, 185);
      
      this.font.color = "#c5c5c5";
      this.font.draw(context, "PRESS       TO CONTINUE", 90, 340);
      this.flashFont.draw(context, "ENTER", 176, 340);
    },

    onDestroyEvent: function () {
      me.input.unbindKey(me.input.KEY.ENTER);
    },

  });

  return GameOverScreen;
});
