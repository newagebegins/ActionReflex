define(["src/me", "src/global"], function (me, global) {
  var MAX_Y_VELOCITY = 11;
  var INITIAL_Y_VELOCITY = 4;
  var VELOCITY_INC = 1.3;
  
  var PlayerEntity = me.ObjectEntity.extend({
    init: function (x, y) {
      var settings = {};
      settings.image = "ball";
      settings.spritewidth = 32;

      this.parent(x, y, settings);

      this.setVelocity(3, INITIAL_Y_VELOCITY);
      this.accel.x = 0.1;
      this.friction.x = 0.04;
      this.gravity = 0.5;
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

      var falling = this.falling;
      var collision = this.updateMovement();

      if (collision.y && falling) {
        if (me.input.isKeyPressed('jump')) {
          this.maxVel.y += VELOCITY_INC;
          if (this.maxVel.y > MAX_Y_VELOCITY) {
            this.maxVel.y = MAX_Y_VELOCITY;
          }
        } else {
          this.maxVel.y -= VELOCITY_INC;
          if (this.maxVel.y > INITIAL_Y_VELOCITY) {
            this.forceJump();
          }
          else {
            this.maxVel.y = INITIAL_Y_VELOCITY;
          }
        }
      }

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