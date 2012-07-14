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
      this.font.color = "#00c5c5";
      this.font.draw(context, "PRESS       TO START", this.pos.x, this.pos.y);
      this.font.color = this.enterAnimation.getFrame();
      this.font.draw(context, "ENTER", this.pos.x + 73, this.pos.y);
    },
    
  });

  return TitleScreenTextEntity;
});
