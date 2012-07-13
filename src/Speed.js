define(["src/me", "src/global"], function (me, global) {
  var ARROWS_NUM = 8;
  
  var Speed = me.HUD_Item.extend({
    
    init: function (x, y) {
      this.parent(x, y);
      this.font = new me.Font('editundo', 24, '#00b500');
      this.ballImage = me.loader.getImage("ball");
      this.speedImage = me.loader.getImage("speed");
    },
    
    draw: function (context, x, y) {
      this.font.draw(context, "SPEED", this.pos.x + x + 115, this.pos.y + y);
      context.drawImage(this.ballImage, 0, 0, 32, 32, this.pos.x + x + 128, this.pos.y + y, 32, 32);
      
      var ball = global.ball;
      var coloredNum = ((this.value / ball.xVelLimit) * ARROWS_NUM).round(0);
      var coloredLeft = Math.abs(coloredNum);
      
      if (global.ballState != "normal" || ball.isBouncing() || ball.jumping || ball.falling) {
        coloredLeft = 0;
      }
      
      for (var i = 0; i < ARROWS_NUM; ++i) {
        var lxpos = this.pos.x + x + 112 - 16 * i;
        var lypos = this.pos.y + y;
        
        var offsetX = 16;
        if (coloredNum < 0 && coloredLeft) {
          --coloredLeft;
          offsetX = 0;
        }
        
        context.drawImage(this.speedImage, offsetX, 0, 16, 32, lxpos, lypos, 16, 32);
      }
      
      for (var j = 0; j < ARROWS_NUM; ++j) {
        var rxpos = this.pos.x + x + 128 + 32 + 16 * j;
        var rypos = this.pos.y + y;
        
        var offsetX2 = 32;
        if (coloredNum > 0 && coloredLeft) {
          --coloredLeft;
          offsetX2 = 48;
        }
        
        context.drawImage(this.speedImage, offsetX2, 0, 16, 32, rxpos, rypos, 16, 32);
      }
    }

  });

  return Speed;
});