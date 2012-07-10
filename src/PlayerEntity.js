define(["src/me", "src/global"], function (me, global) {
  var PlayerEntity = me.ObjectEntity.extend({
    init: function (x, y) {
      var settings = {};
      settings.image = "ball";
      settings.spritewidth = 32;

      this.parent(x, y, settings);

      this.setVelocity(3, 15);
      this.accel.x = 0.1;
      this.friction.x = 0.04;
    },
    update: function () {
      if (global.ballAppearing) {
        return false;
      }
      
      if (me.input.isKeyPressed('left')) {
        this.doWalk(true);
      } else if (me.input.isKeyPressed('right')) {
        this.doWalk(false);
      }
      if (me.input.isKeyPressed('jump')) {
        this.doJump();
      }

      this.updateMovement();
      
      this.animationspeed = this.vel.x == 0 ? 0 : 1 / Math.abs(this.vel.x);

      var res = me.game.collide(this);

      // prevent moving through the sprite
      if (res) {
        this.pos.sub(res);
      }

      // update animation
      if (this.vel.x != 0) {
        this.parent();
      }
      
      if (this.vel.x != 0 || this.vel.y != 0) {
        return true;
      }

      return false;
    },
  });

  return PlayerEntity;
});