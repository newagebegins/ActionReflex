define(["src/me", "src/global"], function (me, global) {
  var BulletEntity = me.ObjectEntity.extend({
    init: function (x, y) {
      var settings = {};
      settings.image = "bullet";
      settings.spritewidth = 16;

      this.parent(x, y, settings);

      this.setVelocity(0, 3.5);
      
      this.collidable = true;
      this.updateColRect(4, 8, 0, 10);
      this.type = "lethal";
    },
    update: function () {
      if (global.ballState != "normal") {
        return false;
      }
      
      var collision = this.updateMovement();

      if (collision.y) {
        me.game.remove(this);
      }
      
      return true;
    },
  });

  return BulletEntity;
});