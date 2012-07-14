define(
  [
    "src/me",
    "src/config",
    "src/global",
    "src/util",
    "src/SplashEntity",
    "src/ArrowEntity",
  ],
  function (
    me,
    config,
    global,
    util,
    SplashEntity,
    ArrowEntity
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

      this.setVelocity(4, INITIAL_Y_VELOCITY);
      this.accel.x = 0.1;
      this.accel.y = 0;
      this.friction.x = 0.04;
      this.gravity = 0.5;
      
      this.xVelLimit = MAX_Y_VELOCITY * MAX_X_VEL_COEFF - 3;
      
      this.addAnimation("move", [0,1,2,3]);
      this.addAnimation("appear", [4,5,6,7]);
      this.addAnimation("disappear", [7,6,5,4]);
      
      if (global.ballState == "appearAfterDeath") {
        this.setCurrentAnimation("appear");
        util.delay(this.onAfterAppearAfterDeathEvent.bind(this), APPEAR_DISAPPEAR_DURATION);
      } else {
        this.setCurrentAnimation("move");
      }
      
      this.inBottle = false;
      me.game.HUD.setItemValue("speed", this.vel.x);
      this.launchTarget = null;
    },
    
    update: function () {
      if (global.ballState == "appearThroughTube" ||
          global.ballState == "drown" ||
          global.ballState == "attract"
      ) {
        return false;
      }
      
      if (global.ballState == "appearAfterDeath" || global.ballState == "disappear") {
        this.animationspeed = 1;
        this.parent();
        return true;
      }
      
      if (global.ballState == "launchLand") {
        this.animationspeed = 0.5;
        this.parent();
        return true;
      }
      
      if (global.ballState == "launchJump") {
        this.launchJump();
      }
      
      if (global.listenBallKeys && me.input.isKeyPressed('jump')) {
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
        if (global.listenBallKeys && me.input.isKeyPressed('jump') && !this.inBottle) {
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
        if (global.listenBallKeys && me.input.isKeyPressed('left')) {
          if (this.isBouncing() && !this.inBottle) {
            this.vel.x = -this.maxVel.y;
            this.maxVel.x = this.maxVel.y * MAX_X_VEL_COEFF;
          }
          else {
            this.doWalk(true);
          }
        }
        else if (global.listenBallKeys && me.input.isKeyPressed('right')) {
          if (this.isBouncing() && !this.inBottle) {
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
      this.inBottle = false;
      
      if (res) {
        if (res.obj.name == "portal") {
          me.state.current().loadLevel(res.obj.to);
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
        else if ((res.obj.name == "water" || res.obj.name == "pit") && global.ballState != "drown") {
          this.drown(res.obj);
        }
        else if (res.obj.name == "vent_pad" && global.ballState != "suck") {
          this.suck(res.obj);
        }
        else if (res.obj.name == "magnet_pad" && global.ballState != "attract") {
          this.attract();
        }
        else if (res.obj.name == "bottle") {
          this.inBottle = true;
        }
        else if (res.obj.name == "launcher" && global.ballState != "launchJump") {
          this.launch(res.obj);
        }
      }

      if (this.vel.x != 0) {
        // update animation
        this.parent();
      }
      
      this.lastVel = this.vel.clone();

      if (this.vel.x != 0 || this.vel.y != 0) {
        me.game.HUD.setItemValue("speed", this.vel.x);
        return true;
      }

      return false;
    },
    
    isBouncing: function () {
      return this.maxVel.y > INITIAL_Y_VELOCITY;
    },
    
    onAfterDisappearEvent: function () {
      me.state.current().reloadLevel();
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
    
    drown: function (obj) {
      var self = this;
      global.ballState = "drown";
      
      if (obj.name == "water") {
        this.pos.x = obj.pos.x - 16;
      }
      else {
        if (this.vel.x > 0) {
          this.pos.x = obj.pos.x;
        }
        else {
          this.pos.x = obj.right - this.width;
        }
      }
      
      this.vel.x = 0;
      
      var splashX = this.pos.x;
      var splashY = this.pos.y + 10;

      var drown = new me.Tween(this.pos)
        .to({y: obj.pos.y + 8}, 800)
        .onComplete(function () {
          if (obj.name == "water") {
            var splash = new SplashEntity(splashX, splashY);
            splash.setCurrentAnimation("default", function () {
              self.onAfterDisappearEvent();
            });
            me.game.add(splash, 1);
            me.game.sort();
          }
          else {
            self.onAfterDisappearEvent();
          }
        });
      
      drown.start();
    },
    
    suck: function (pad) {
      var self = this;
      global.listenBallKeys = false;
      global.ballState = "suck";
      new me.Tween(this.pos)
        .to({x: pad.pos.x + 16, y: pad.pos.y - 116}, 600)
        .onComplete(function () {
          me.game.remove(self);
          var vent = me.game.getEntityByName("vent")[0];
          vent.setCurrentAnimation("suck", function () {
            me.state.current().loadLevel(vent.to);
            me.state.current().createBall();
          });
        })
        .start();
    },
    
    attract: function () {
      var self = this;
      global.ballState = "attract";
      this.vel.x = 0;
      var magnet = me.game.getEntityByName("magnet")[0];
      var arrow = new ArrowEntity(560, magnet.bottom + 16);
      me.game.add(arrow, 1);
      me.game.sort();
      var attract = new me.Tween(this.pos).to({x: magnet.left + 8, y: magnet.bottom}, 250);
      var pierce = new me.Tween(arrow.pos).to({x: magnet.left + 28}, 500);
      pierce.onComplete(function () {
        self.disappear();
      });
      attract.chain(pierce);
      attract.start();
    },
    
    launch: function (launcher) {
      global.listenBallKeys = false;
      global.ballState = "launchJump";
      
      this.vel.x = 0;
      var align = new me.Tween(this.pos).to({x: launcher.pos.x}, 200);
      var moveDown = new me.Tween(this.pos).to({y: launcher.pos.y + 18}, 500);
      var moveUp = new me.Tween(this.pos).to({y: launcher.pos.y - 32}, 200);
      
      align.chain(moveDown);
      moveDown.chain(moveUp);
      align.start();
    },
    
    launchJump: function () {
      this.vel.y = -5;
        
      if (!this.launchTarget) {
        this.launchTarget = me.game.getEntityByName("launch_target")[0];
        return;
      }
      
      if (this.top <= this.launchTarget.top) {
        global.ballState = "launchLand";
        
        var one = new me.Tween(this.pos).to({x: this.launchTarget.left + 32, y: this.launchTarget.top - 32}, 200);
        var two = new me.Tween(this.pos).to({x: this.launchTarget.left, y: this.launchTarget.top}, 200);
        two.onComplete(this.onAfterLaunchLandEvent.bind(this));

        one.chain(two);
        one.start();
      }
    },
    
    onAfterLaunchLandEvent: function () {
      global.ballState = "normal";
      global.listenBallKeys = true;
      this.vel.x = 0;
      this.vel.y = 0;
      this.maxVel.y = INITIAL_Y_VELOCITY;
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