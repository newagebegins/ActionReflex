define(function () {
  
  var Animation = Object.extend({
    
    init: function (frames, frameDuration, loop) {
      this.frames = frames;
      this.frameDuration = frameDuration;
      this.loop = loop;

      this.frame = 0;
      this.timer = 0;
      this.completed = false;
    },
    
    update: function () {
      if (this.completed) {
        return;
      }
      if (this.timer >= this.frameDuration) {
        this.timer = 0;
        this.frame++;
      }
      if (this.frame == this.frames.length) {
        if (this.loop) {
          this.frame = 0;
        }
        else {
          this.frame--;
          this.completed = true;
        }
      }
      this.timer++;
    },
    
    getFrame: function () {
      return this.frames[this.frame];
    },
    
  });
  
  return Animation;
});
