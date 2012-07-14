define(["src/me"], function (me) {
  
  var TimelineHUD = me.HUD_Item.extend({
    
    init: function (x, y) {
      this.parent(x, y);
      
      this.font = new me.Font('editundo', 24, 'white');
      this.timelineImage = me.loader.getImage("timeline");
    },
    
    draw: function (context, x, y) {
      this.font.color = "#00c5c5";
      this.font.draw(context, "TIME", this.pos.x + x + 70, this.pos.y + y);
      
      context.drawImage(this.timelineImage, this.pos.x + x, this.pos.y + y);
    }

  });

  return TimelineHUD;
});
