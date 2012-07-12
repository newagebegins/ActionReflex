define(["src/me", "src/GloveEntity"], function (me, GloveEntity) {
  var GloveBoxEntity = me.ObjectEntity.extend({
    init: function (x, y, settings) {
      settings.image = "glove_box";
      settings.spritewidth = 32;

      this.parent(x, y + 16, settings);
      
      this.glove = new GloveEntity(x, y + 32);
      me.game.add(this.glove, settings.z - 1);
      me.game.sort();
    },
  });

  return GloveBoxEntity;
});