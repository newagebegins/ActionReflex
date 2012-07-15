define(["src/me", "src/config"], function (me, config) {
  
  var HammerHUD = me.HUD_Item.extend({
    
    init: function (x, y) {
      this.parent(x, y);
      this.font = new me.Font('editundo', config.fontSize, '#c5c500');
      this.hammerImage = me.loader.getImage("hammer_hud");
    },
    
    draw: function (context, x, y) {
      var posx = this.pos.x + x;
      var posy = this.pos.y + y;
      context.drawImage(this.hammerImage, posx, posy + y);
      this.font.draw(context, this.value, posx, posy + 65);
    }

  });

  return HammerHUD;
  
});
