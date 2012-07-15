define(["src/me", "src/config"], function (me, config) {
  
  var TimelineHUD = me.HUD_Item.extend({
    
    init: function (x, y) {
      this.parent(x, y);
      
      this.font = new me.Font('editundo', config.fontSize, 'white');
      this.timelineImage = me.loader.getImage("timeline");
    },
    
    draw: function (context, x, y) {
      this.font.color = "#00c5c5";
      this.font.draw(context, "TIME", this.pos.x + x + 70, this.pos.y + y);
      
      context.drawImage(this.timelineImage, this.pos.x + x, this.pos.y + y);
      this.paintTimeline(context, x, y);
    },
    
    paintTimeline: function (context, x, y) {
      var xpos = this.pos.x + x + 16;
      var ypos = this.pos.y + y + 12;
      context.fillStyle = "#000000";
      context.fillRect(xpos + this.value, ypos, config.timelineWidth - this.value, 8);
    },

  });

  return TimelineHUD;
});
