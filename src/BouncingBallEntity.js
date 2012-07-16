define(["src/me"], function (me) {
  
  var BouncingBallEntity = me.ObjectEntity.extend({
    
    speed: 1,
    
    init: function (x, y, settings) {
      settings.image = "ball";
      settings.spritewidth = 32;
      settings.spriteheight = 32;

      this.parent(x, y + 16, settings);
      
      this.vel.x = this.speed;
      this.vel.y = -this.speed;
      this.gravity = 0;
      
      this.addAnimation("spin", [0,1,2,3]);
      this.setCurrentAnimation("spin");
      this.animationspeed = 1;
    },
    
    update: function () {
      var collision = this.updateMovement();
      
      if (collision.x) {
        this.vel.x = -this.lastVel.x;
        
        if (this.vel.x < 0) {
          this.flipX(true);
        }
        else {
          this.flipX(false);
        }
        
        me.audio.play("bounce");
      }
      
      if (collision.y) {
        this.vel.y = -this.lastVel.y;
        me.audio.play("bounce");
      }
      
      this.lastVel = this.vel.clone();
      this.parent();
      return true;
    },
    
  });

  return BouncingBallEntity;
});
