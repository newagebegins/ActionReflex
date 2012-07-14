define(["src/me", "src/Animation"], function (me, Animation) {
  
  var TitleScreen = me.ScreenObject.extend({
    
    init : function() {
      this.parent(true);
      
      this.titleImage = null;
      this.font = null;
      
      this.enterColors = [
        '#00c5c5',
        '#c5c500',
        '#c5c5c5',
        '#0000c5',
        '#c50000',
        '#c500c5',
        '#00b500',
      ];
    },

    onResetEvent: function () {
      if (this.titleImage == null) {
        this.titleImage = me.loader.getImage("title");
        this.font = new me.Font('editundo', 24, '#00c5c5');
      }
      
      me.input.bindKey(me.input.KEY.ENTER, "enter", true);
      this.enterAnimation = new Animation(this.enterColors, 5, true);
    },

    update: function () {
      if (me.input.isKeyPressed('enter')) {
        me.state.change(me.state.PLAY);
      }
      this.enterAnimation.update();
      return true;
    },

    draw: function (context) {
      me.video.clearSurface(context, "black");
      context.drawImage(this.titleImage, 0,0);
      this.font.color = "#00c5c5";
      this.font.draw(context, "PRESS       TO START", 100, 100);
      this.font.color = this.enterAnimation.getFrame();
      this.font.draw(context, "ENTER", 173, 100);
    },

    onDestroyEvent: function () {
      me.input.unbindKey(me.input.KEY.ENTER);
    },

  });

  return TitleScreen;
});
