define(["src/me"], function (me) {
  var util = {};
  
  util.delay = function (callback, delay) {
    new me.Tween({t: 0}).to({t: 100}, delay).onComplete(callback).start();
  };
  
  return util;
});