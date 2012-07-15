define(["src/me", "src/config"], function (me, config) {
  var BuoyHUD = me.HUD_Item.extend({
    
    init: function (x, y) {
      this.parent(x, y);
      this.font = new me.Font('editundo', config.fontSize, '#c5c500');
      this.buoyImage = me.loader.getImage("buoy_hud");
    },
    
    draw: function (context, x, y) {
      var posx = this.pos.x + x;
      var posy = this.pos.y + y;
      context.drawImage(this.buoyImage, posx, posy + y);
      this.font.draw(context, this.value, posx + 16, posy + 65);
    }

  });

  return BuoyHUD;
});