define(["src/me", "src/config"], function (me, config) {
  
  function updateBuoy(amount) {
    me.gamestat.updateValue("ptsNextBuoy", -amount);
    if (me.gamestat.getItemValue("ptsNextBuoy") <= 0) {
      me.game.HUD.updateItemValue("buoy", 1);
      me.gamestat.setValue("ptsNextBuoy", config.bouyCost + me.gamestat.getItemValue("ptsNextBuoy"));
    }
  }
  
  function updateHammer(amount) {
    me.gamestat.updateValue("ptsNextHammer", -amount);
    if (me.gamestat.getItemValue("ptsNextHammer") <= 0) {
      me.game.HUD.updateItemValue("hammer", 1);
      me.gamestat.setValue("ptsNextHammer", config.hammerCost + me.gamestat.getItemValue("ptsNextHammer"));
    }
  }
  
  function updateKey(amount) {
    me.gamestat.updateValue("ptsNextKey", -amount);
    if (me.gamestat.getItemValue("ptsNextKey") <= 0) {
      me.game.HUD.updateItemValue("key", 1);
      me.gamestat.setValue("ptsNextKey", config.keyCost + me.gamestat.getItemValue("ptsNextKey"));
    }
  }
  
  return {
    add: function (amount) {
      me.gamestat.updateValue("score", amount);
      updateBuoy(amount);
      updateHammer(amount);
      updateKey(amount);
    },
  };
});
