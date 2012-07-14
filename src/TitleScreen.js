define(["src/me"], function (me) {
  
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
      this.enterColorDuration = 5;
    },

    onResetEvent: function () {
      if (this.titleImage == null) {
        this.titleImage = me.loader.getImage("title");
        this.font = new me.Font('editundo', 24, '#00c5c5');
      }
      
      me.input.bindKey(me.input.KEY.ENTER, "enter", true);
      
      this.enterColor = 0;
      this.enterColorTimer = 0;
    },

    update: function () {
      if (me.input.isKeyPressed('enter')) {
        me.state.change(me.state.PLAY);
      }
      
      this.enterColorTimer++;
      if (this.enterColorTimer >= this.enterColorDuration) {
        this.enterColorTimer = 0;
        this.enterColor++;
        if (this.enterColor >= this.enterColors.length) {
          this.enterColor = 0;
        }
      }
      
      return true;
    },

    draw: function (context) {
      me.video.clearSurface(context, "black");
      context.drawImage(this.titleImage, 0,0);
      this.font.color = "#00c5c5";
      this.font.draw(context, "PRESS       TO START", 100, 100);
      this.font.color = this.getEnterColor();
      this.font.draw(context, "ENTER", 173, 100);
    },

    onDestroyEvent: function () {
      me.input.unbindKey(me.input.KEY.ENTER);
    },
    
    getEnterColor: function () {
      return this.enterColors[this.enterColor];
    },

  });

  return TitleScreen;
});
