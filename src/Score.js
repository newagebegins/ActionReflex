define(["src/me"], function (me) {
  var Score = me.HUD_Item.extend({
    
    init: function (x, y) {
      this.parent(x, y);
      this.font = new me.Font('editundo', 24, 'white');
    },
    
    draw: function (context, x, y) {
      this.parent(context, x, y);
      this.font.color = "#c5c500";
      this.font.draw(context, "SCORE", this.pos.x + x, this.pos.y + y);
      this.font.color = "#00c5c5";
      this.font.draw(context, ("" + this.value).lpad("0", 5), this.pos.x + x + 80, this.pos.y + y);
    }

  });

  return Score;
});