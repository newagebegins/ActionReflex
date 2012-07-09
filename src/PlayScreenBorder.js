define(["src/me"], function (me) {
  var PlayScreenBorder = me.HUD_Item.extend({
    init: function (x, y) {
      this.parent(x, y);
      this.image = me.loader.getImage("border");
    },
    draw: function (context, x, y) {
      context.drawImage(this.image, this.pos.x + x, this.pos.y + y);
    }
  });

  return PlayScreenBorder;
});