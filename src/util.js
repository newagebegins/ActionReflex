define(["src/me"], function (me) {
  var util = {};
  
  util.delay = function (callback, delay) {
    new me.Tween({t: 0}).to({t: 100}, delay).onComplete(callback).start();
  };
  
  String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length)
      str = padString + str;
    return str;
  };
  
  return util;
});