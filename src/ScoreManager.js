define(["src/me", "src/config"], function (me, config) {
  
  function updateBuoy(amount) {
    me.gamestat.updateValue("ptsNextBuoy", -amount);
    if (me.gamestat.getItemValue("ptsNextBuoy") <= 0) {
      me.game.HUD.updateItemValue("buoy", 1);
      me.gamestat.setValue("ptsNextBuoy", config.bouyCost + me.gamestat.getItemValue("ptsNextBuoy"));
    }
  }
  
  return {
    add: function (amount) {
      me.gamestat.updateValue("score", amount);
      updateBuoy(amount);
    },
  };
});
