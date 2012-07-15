define(["src/me", "src/config"], function (me, config) {
  
  var KeyHUD = me.HUD_Item.extend({
    
    init: function (x, y) {
      this.parent(x, y);
      this.font = new me.Font('editundo', config.fontSize, '#c5c500');
      this.keyImage = me.loader.getImage("key_hud");
    },
    
    draw: function (context, x, y) {
      var posx = this.pos.x + x;
      var posy = this.pos.y + y;
      context.drawImage(this.keyImage, posx, posy + y + 16);
      this.font.draw(context, this.value, posx + 16, posy + 65);
    }

  });

  return KeyHUD;
  
});
