define(["src/me"], function (me) {
  var FireEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
      settings.image = "fire";
      settings.spritewidth = 32;

      this.parent(x, y+32, settings);
      
      this.collidable = true;
      this.updateColRect(0, 1, 48, 1);
      this.type = "lethal";
      
      this.frame = 0;
      this.fireFrames = [0,0,0,0,1,2,3,2,1,0,0,0,0];
      this.addAnimation("default", this.fireFrames);
      this.setCurrentAnimation("default");
    },
    
    update: function () {
      this.parent();
      var frame = this.fireFrames[this.current.idx];
      if (frame == this.frame) {
        return;
      }
      this.frame = frame;
      if (frame == 0) {
        this.updateColRect(0, 1, 48, 1);
      }
      else if (frame == 1) {
        this.updateColRect(0, this.width, 32, 16);
      }
      else if (frame == 2) {
        this.updateColRect(0, this.width, 16, 32);
      }
      else if (frame == 3) {
        this.updateColRect(0, this.width, 0, 48);
      }
    },
  });

  return FireEntity;
});
