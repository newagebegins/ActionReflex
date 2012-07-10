define(["src/me", "src/global", "src/BulletEntity"], function (me, global, BulletEntity) {
  var CannonEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
      settings.image = "cannon";
      settings.spritewidth = 64;

      this.parent(x, y + 32, settings);
      
      this.bulletTimer = 0;
      this.bulletDuration = 100;
      
      this.collidable = true;
      this.updateColRect(16, 48, 0, 48);
    },
    update: function () {
      if (global.ballState != "normal") {
        return false;
      }
      
      this.bulletTimer++;
      if (this.bulletTimer >= this.bulletDuration) {
        this.bulletTimer = 0;
        me.game.add(new BulletEntity(this.pos.x + 32, this.pos.y + 32), this.z);
        me.game.sort();
      }
      return false;
    },
  });

  return CannonEntity;
});