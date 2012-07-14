define(["src/me", "src/Animation"], function (me, Animation) {
  
  var TitleScreenTextEntity = me.Rect.extend({
    
    enterColors: [
      '#00c5c5',
      '#c5c500',
      '#c5c5c5',
      '#0000c5',
      '#c50000',
      '#c500c5',
      '#00b500',
    ],
    
    init: function (x, y, settings) {
      this.parent(new me.Vector2d(x, y), settings.width, settings.height);
      
      this.visible = true;
      this.font = new me.Font('editundo', 24, '#00c5c5');
      this.enterAnimation = new Animation(this.enterColors, 5, true);
    },
    
    update: function () {
      this.enterAnimation.update();
      return true;
    },
    
    draw: function (context) {
      var xpos = this.pos.x + 138;
      this.font.color = "#00c5c5";
      this.font.draw(context, "PRESS       TO START", xpos, this.pos.y);
      this.font.color = this.enterAnimation.getFrame();
      this.font.draw(context, "ENTER", xpos + 73, this.pos.y);
      
      this.font.color = "#c5c500";
      this.font.draw(context, "WRITTEN BY C.F.URQUHART", this.pos.x + 125, this.pos.y+90);
      
      this.font.color = "#00b500";
      this.font.draw(context, "GAME DESIGN..CHUBSLY AND HERMANN", this.pos.x + 70, this.pos.y+120);
    },
    
  });

  return TitleScreenTextEntity;
});
