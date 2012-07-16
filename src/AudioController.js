define(["src/me"], function (me) {
  var anchor = null;
  
  function toggleAudio() {
    if (me.audio.isAudioEnable()) {
      me.audio.disable();
      anchor.text('ENABLE AUDIO');
    }
    else {
      me.audio.enable();
      anchor.text('DISABLE AUDIO');
    }
    return false;
  }
  
  return {
    init: function () {
      anchor = $('<a id="toggleAudio" href="#">DISABLE AUDIO</a>');
      $('#audio').append(anchor);
      anchor.click(toggleAudio);
    },
  };
});
