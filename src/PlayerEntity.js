define(["src/me", "src/global"], function (me, global) {
  var PlayerEntity = me.ObjectEntity.extend({
    init: function (x, y) {
      var settings = {};
      settings.image = "ball";
      settings.spritewidth = 32;

      this.parent(x, y, settings);

      this.setVelocity(3, 15);
      this.animationspeed = 1;
    },
    update: function () {
      if (global.ballAppearing) {
        return false;
      }
      
      if (me.input.isKeyPressed('left')) {
        this.doWalk(true);
      } else if (me.input.isKeyPressed('right')) {
        this.doWalk(false);
      } else {
        this.vel.x = 0;
      }
      if (me.input.isKeyPressed('jump')) {
        this.doJump();
      }

      this.updateMovement();

      var res = me.game.collide(this);

      // prevent moving through the sprite
      if (res) {
        this.pos.sub(res);
      }

      // update animation
      if (this.vel.x != 0 || this.vel.y != 0) {
        this.parent(this);
        return true;
      }

      return false;
    },
  });

  return PlayerEntity;
});