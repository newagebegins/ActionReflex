define(
  [
    "src/me",
    "src/config",
    "src/global",
    "src/util",
    "src/SplashEntity"
  ],
  function (
    me,
    config,
    global,
    util,
    SplashEntity
  ) {
      
  var MAX_Y_VELOCITY = 11;
  var INITIAL_Y_VELOCITY = 4;
  var APPEAR_DISAPPEAR_DURATION = 1200;
  var MAX_X_VEL_COEFF = 0.625;

  var PlayerEntity = me.ObjectEntity.extend({
    
    init: function (x, y) {
      var settings = {};
      settings.image = "ball";
      settings.spritewidth = 32;
      settings.spriteheight = 32;
      
      this.parent(x, y + 16, settings);
      
      this.font = new me.Font('century gothic', 8, 'white');

      this.setVelocity(3, INITIAL_Y_VELOCITY);
      this.accel.x = 0.1;
      this.accel.y = 0;
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
      
      global.ball = this;
    },
    
    update: function () {
      if (global.ballState == "appearThroughTube" || global.ballState == "drown") {
        return false;
      }
      
      if (global.ballState == "appearAfterDeath" || global.ballState == "disappear") {
        this.animationspeed = 1;
        this.parent();
        return true;
      }
      
      if (me.input.isKeyPressed('jump')) {
        this.doJump();
      }

      var falling = this.falling;
      var velY = this.vel.y;
      var collision = this.updateMovement();
      
      if (velY == 0 && this.vel.y > 0) {
        this.falling = true;
      }
      
      if (this.falling) {
        this.maxVel.y += 0.2;
        if (this.maxVel.y > MAX_Y_VELOCITY) {
          this.maxVel.y = MAX_Y_VELOCITY;
        }
      }
      
      if (this.jumping) {
        this.maxVel.y -= 0.3;
      }
      
      if (collision.y < 0) {
        this.maxVel.y -= 2;
      }
      
      if (collision.y && falling) {
        if (me.input.isKeyPressed('jump')) {
          this.maxVel.y += 3;
          if (this.maxVel.y > MAX_Y_VELOCITY) {
            this.maxVel.y = MAX_Y_VELOCITY;
          }
        } else {
          if (this.isBouncing()) {
            this.forceJump();
          } else {
            this.maxVel.y = INITIAL_Y_VELOCITY;
          }
        }
      }
      
      if (collision.y) {
        if (me.input.isKeyPressed('left')) {
          if (this.isBouncing()) {
            this.vel.x = -this.maxVel.y;
            this.maxVel.x = this.maxVel.y * MAX_X_VEL_COEFF;
          }
          else {
            this.doWalk(true);
          }
        }
        else if (me.input.isKeyPressed('right')) {
          if (this.isBouncing()) {
            this.vel.x = this.maxVel.y;
            this.maxVel.x = this.maxVel.y * MAX_X_VEL_COEFF;
          }
          else {
            this.doWalk(false);
          }
        }
        else if (this.isBouncing()) {
          this.vel.x = 0;
        }
      }
      
      if (collision.x && !collision.y) {
        // bounce off walls
        this.vel.x = -this.lastVel.x;
      }

      this.animationspeed = this.vel.x == 0 ? 0 : 1 / Math.abs(this.vel.x);

      var res = me.game.collide(this);
      
      if (res) {
        if (res.obj.name == "portal") {
          me.levelDirector.loadLevel(res.obj.to);
          me.state.current().createBall(this);
        }
        else if (res.type == "lethal") {
          this.disappear();
        }
        else if (res.obj.name == "glove") {
          this.vel.x = 0;
          this.maxVel.y = 15;
          this.forceJump();
        }
        else if (res.obj.name == "water" && global.ballState != "drown") {
          this.drown(res.obj);
        }
      }

      if (this.vel.x != 0) {
        // update animation
        this.parent();
      }
      
      this.lastVel = this.vel.clone();

      if (this.vel.x != 0 || this.vel.y != 0) {
        return true;
      }

      return false;
    },
    
    isBouncing: function () {
      return this.maxVel.y > INITIAL_Y_VELOCITY;
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
    
    disappear: function () {
      this.setCurrentAnimation("disappear");
      global.ballState = "disappear";
      util.delay(this.onAfterDisappearEvent.bind(this), APPEAR_DISAPPEAR_DURATION);
    },
    
    drown: function (water) {
      var self = this;
      global.ballState = "drown";
      
      this.vel.x = 0;
      this.pos.x = water.pos.x - 16;
      
      var splashX = this.pos.x;
      var splashY = this.pos.y + 10;

      var drown = new me.Tween(this.pos)
        .to({ y: water.pos.y + 8 }, 800)
        .onComplete(function () {
          var splash = new SplashEntity(splashX, splashY);
          splash.setCurrentAnimation("default", function () {
            self.onAfterDisappearEvent();
          });
          me.game.add(splash, 1);
          me.game.sort();
        });
      drown.start();
    },
    
    draw: function (context) {
      this.parent(context);
      if (config.debug) {
        var text = "x:" + this.pos.x.round(0) + "; y:" + this.pos.y.round(0);
        this.font.draw(context, text, this.pos.x - 3, this.pos.y - 15);
        this.font.draw(context, "maxVel.y:" + this.maxVel.y.round(2), this.pos.x - 3, this.pos.y - 5);
      }
    },
    
  });

  return PlayerEntity;
});