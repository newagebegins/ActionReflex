define(["src/me", "src/global"], function (me, global) {
  
  var FroggyEntity = me.ObjectEntity.extend({
    
    init: function (x, y, settings) {
      settings.image = "froggy";
      settings.spritewidth = 48;

      this.parent(x, y + 48, settings);

      this.collidable = true;
      this.type = "lethal";
      
      this.startX = x;
      this.endX = x + settings.width - settings.spritewidth;
      
      this.pos.x = x + settings.width - settings.spritewidth;
      this.walkLeft = true;
      
      this.setVelocity(1, 0);
    },
    
    update: function () {
      if (global.ballState != "normal") {
        return false;
      }
      if (this.walkLeft && this.pos.x <= this.startX) {
        this.walkLeft = false;
      }
      else if (!this.walkLeft && this.pos.x >= this.endX) {
        this.walkLeft = true;
      }
      this.doWalk(this.walkLeft);
      this.updateMovement();
      if (this.vel.x != 0) {
        this.parent();
        return true;
      }
      return false;
    },
    
  });

  return FroggyEntity;
  
});