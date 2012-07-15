define(["src/me", "src/config", "src/FlashFont"], function (me, config, FlashFont) {
  
  var TitleScreenTextEntity = me.Rect.extend({
    
    init: function (x, y, settings) {
      this.parent(new me.Vector2d(x, y), settings.width, settings.height);
      
      this.visible = true;
      this.font = new me.Font('editundo', config.fontSize, '#00c5c5');
      this.flashFont = new FlashFont('editundo', config.fontSize);
    },
    
    update: function () {
      this.flashFont.update();
      return true;
    },
    
    draw: function (context) {
      var xpos = this.pos.x + 115;
      this.font.color = "#00c5c5";
      this.font.draw(context, "PRESS       TO START", xpos, this.pos.y);
      this.flashFont.draw(context, "ENTER", xpos + 85, this.pos.y);
      
      this.font.color = "#c5c500";
      this.font.draw(context, "WRITTEN BY C.F.URQUHART", this.pos.x + 100, this.pos.y+90);
      
      this.font.color = "#00b500";
      this.font.draw(context, "GAME DESIGN..CHUBSLY AND HERMANN", this.pos.x + 40, this.pos.y+125);
    },
    
  });

  return TitleScreenTextEntity;
});
