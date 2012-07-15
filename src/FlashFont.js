define(["src/me", "src/Animation"], function (me, Animation) {
  
  var FlashFont = me.Font.extend({
    
    flashColors: [
      '#00c5c5',
      '#c5c500',
      '#c5c5c5',
      '#0000c5',
      '#c50000',
      '#c500c5',
      '#00b500',
    ],
    flashSpeed: 5,
    
    init: function (font, size) {
      this.parent(font, size, '#00c5c5');
      this.enterAnimation = new Animation(this.flashColors, this.flashSpeed, true);
    },
    
    update: function () {
      this.enterAnimation.update();
      this.color = this.enterAnimation.getFrame();
    },
    
  });
  
  return FlashFont;
  
});
