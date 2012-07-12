define(["src/me", "src/config", "src/global"], function (me, config, global) {
  var SPEED = 250;
  
  var GloveEntity = me.ObjectEntity.extend({
    
    init: function (x, y) {
      var settings = {};
      settings.name = "glove";
      settings.image = "glove";
      settings.spritewidth = 32;

      this.parent(x, y, settings);
      
      this.collidable = true;
      
      this.ballDetectionBox = new me.Rect(
        new me.Vector2d(this.pos.x, this.pos.y - 128), this.width, 128);
      this.moving = false;
      this.out = false;
    },
    
    update: function () {
      var self = this;
      if (this.ballDetectionBox.overlaps(global.ball) && !this.moving && !this.out) {
        this.moving = true;
        var moveUp = new me.Tween(this.pos)
          .to({y: this.pos.y - this.height }, SPEED)
          .onComplete(function () {
            self.out = true;
          });
        var moveDown = new me.Tween(this.pos)
          .to({y: this.pos.y }, SPEED)
          .onComplete(function () {
            self.moving = false;
            self.out = false;
          });
        moveUp.chain(moveDown);
        moveUp.start();
      }
      return false;
    },
    
    draw: function (context) {
      this.parent(context);
      if (config.debug) {
        this.ballDetectionBox.draw(context, "red");
      }
    },
    
  });

  return GloveEntity;
});