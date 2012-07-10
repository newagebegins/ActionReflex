define(["src/me", "src/global", "src/util"], function (me, global, util) {
  var MAX_Y_VELOCITY = 11;
  var INITIAL_Y_VELOCITY = 4;
  var VELOCITY_INC = 1.3;
  var APPEAR_DISAPPEAR_DURATION = 1200;

  var PlayerEntity = me.ObjectEntity.extend({
    init: function (x, y) {
      var settings = {};
      settings.image = "ball";
      settings.spritewidth = 32;
      settings.spriteheight = 32;

      this.parent(x, y, settings);

      this.setVelocity(3, INITIAL_Y_VELOCITY);
      this.accel.x = 0.1;
      this.friction.x = 0.04;
      this.gravity = 0.5;

      this.addAnimation("move", [0,1,2,3]);
      this.addAnimation("appear", [4,5,6,7]);
      this.addAnimation("disappear", [7,6,5,4]);
      
      if (global.ballState == "appearAfterDeath") {
        this.setCurrentAnimation("appear");
        util.delay(this.onAfterAppearAfterDeathEvent.bind(this), APPEAR_DISAPPEAR_DURATION);
      } else {
        this.setCurrentAnimation("move");
      }
    },
    update: function () {
      if (global.ballState == "appearThroughTube") {
        return false;
      }
      
      if (global.ballState == "appearAfterDeath" || global.ballState == "disappear") {
        this.animationspeed = 1;
        this.parent();
        return true;
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
          } else {
            this.maxVel.y = INITIAL_Y_VELOCITY;
          }
        }
      }

      this.animationspeed = this.vel.x == 0 ? 0 : 1 / Math.abs(this.vel.x);

      var res = me.game.collide(this);
      
      if (res) {
        if (res.obj.name == "portal") {
          me.levelDirector.loadLevel(res.obj.to);
          me.state.current().createBall(this);
        }
        else if (res.type == "lethal") {
          this.setCurrentAnimation("disappear");
          global.ballState = "disappear";
          util.delay(this.onAfterDisappearEvent.bind(this), APPEAR_DISAPPEAR_DURATION);
        }
      }

      if (this.vel.x != 0) {
        // update animation
        this.parent();
      }

      if (this.vel.x != 0 || this.vel.y != 0) {
        return true;
      }

      return false;
    },
    onAfterDisappearEvent: function () {
      me.levelDirector.reloadLevel();
      global.ballState = "appearAfterDeath";
      me.state.current().createBall();
    },
    onAfterAppearAfterDeathEvent: function () {
      global.ballState = "normal";
      this.setCurrentAnimation("move");
    },
  });

  return PlayerEntity;
});