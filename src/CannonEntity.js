define(["src/me", "src/BulletEntity"], function (me, BulletEntity) {
  var CannonEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
      settings.image = "cannon";
      settings.spritewidth = 64;

      this.parent(x, y, settings);
      
      this.bulletTimer = 0;
      this.bulletDuration = 100;
    },
    update: function () {
      this.bulletTimer++;
      if (this.bulletTimer >= this.bulletDuration) {
        this.bulletTimer = 0;
        me.game.add(new BulletEntity(this.pos.x + 32, this.pos.y + 32));
        me.game.sort();
      }
      return false;
    },
  });

  return CannonEntity;
});