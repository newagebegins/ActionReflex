define(["src/me", "src/global", "src/BulletEntity"], function (me, global, BulletEntity) {
  var CannonEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
      settings.image = "cannon";
      settings.spritewidth = 48;

      this.parent(x, y + 32, settings);
      
      this.bulletTimer = 0;
      this.bulletDuration = 100;
    },
    update: function () {
      if (global.ballState != "normal") {
        return false;
      }
      
      this.bulletTimer++;
      if (this.bulletTimer >= this.bulletDuration) {
        this.bulletTimer = 0;
        me.game.add(new BulletEntity(this.pos.x + 16, this.pos.y + 48), this.z);
        me.game.sort();
      }
      return false;
    },
  });

  return CannonEntity;
});