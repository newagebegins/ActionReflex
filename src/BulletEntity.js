define(["src/me"], function (me) {
  var BulletEntity = me.ObjectEntity.extend({
    init: function (x, y) {
      var settings = {};
      settings.image = "bullet";
      settings.spritewidth = 16;

      this.parent(x, y, settings);

      this.setVelocity(0, 2);
    },
    update: function () {
      var collision = this.updateMovement();

      if (collision.y) {
        me.game.remove(this);
      }
      
      return true;
    },
  });

  return BulletEntity;
});