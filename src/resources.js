define(function () {
  
  var resources = [
    {
      name: "loading_bg",
      type: "image",
      src: "images/loading_bg.gif"
    },
    {
      name: "tiles",
      type: "image",
      src: "images/tiles.gif"
    },
    {
      name: "tiles2",
      type: "image",
      src: "images/tiles2.gif"
    },
    {
      name: "metatiles",
      type: "image",
      src: "images/metatiles.png"
    },
    {
      name: "border",
      type: "image",
      src: "images/border.gif"
    },
    {
      name: "title",
      type: "image",
      src: "images/title.gif"
    },
    {
      name: "ball",
      type: "image",
      src: "images/ball.gif"
    },
    {
      name: "flag_green",
      type: "image",
      src: "images/flag_green.gif"
    },
    {
      name: "flag_red",
      type: "image",
      src: "images/flag_red.gif"
    },
    {
      name: "cannon",
      type: "image",
      src: "images/cannon.gif"
    },
    {
      name: "bullet",
      type: "image",
      src: "images/bullet.gif"
    },
    {
      name: "tube",
      type: "image",
      src: "images/tube.gif"
    },
    {
      name: "glove_box",
      type: "image",
      src: "images/glove_box.gif"
    },
    {
      name: "glove",
      type: "image",
      src: "images/glove.gif"
    },
    {
      name: "spikes",
      type: "image",
      src: "images/spikes.gif"
    },
    {
      name: "water",
      type: "image",
      src: "images/water.gif"
    },
    {
      name: "splash",
      type: "image",
      src: "images/splash.gif"
    },
    {
      name: "vent_pad",
      type: "image",
      src: "images/vent_pad.gif"
    },
    {
      name: "vent",
      type: "image",
      src: "images/vent.gif"
    },
    {
      name: "bottle",
      type: "image",
      src: "images/bottle.png"
    },
    {
      name: "fire",
      type: "image",
      src: "images/fire.gif"
    },
    {
      name: "pts100",
      type: "image",
      src: "images/pts100.gif"
    },
    {
      name: "pts200",
      type: "image",
      src: "images/pts200.gif"
    },
    {
      name: "pts500",
      type: "image",
      src: "images/pts500.gif"
    },
    {
      name: "speed",
      type: "image",
      src: "images/speed.gif"
    },
    {
      name: "magnet_pad",
      type: "image",
      src: "images/magnet_pad.gif"
    },
    {
      name: "magnet",
      type: "image",
      src: "images/magnet.gif"
    },
    {
      name: "arrow",
      type: "image",
      src: "images/arrow.gif"
    },
    {
      name: "buoy_hud",
      type: "image",
      src: "images/buoy_hud.gif"
    },
    {
      name: "buoy",
      type: "image",
      src: "images/buoy.gif"
    },
    {
      name: "hammer_hud",
      type: "image",
      src: "images/hammer_hud.gif"
    },
    {
      name: "key_hud",
      type: "image",
      src: "images/key_hud.gif"
    },
    {
      name: "timeline",
      type: "image",
      src: "images/timeline.gif"
    },
    {
      name: "froggy",
      type: "image",
      src: "images/froggy.gif"
    },
    {
      name: "title",
      type: "tmx",
      src: "maps/title.tmx"
    },
    {
      name: "scr001",
      type: "tmx",
      src: "maps/scr001.tmx"
    },
    {
      name: "scr002",
      type: "tmx",
      src: "maps/scr002.tmx"
    },
    {
      name: "scr003",
      type: "tmx",
      src: "maps/scr003.tmx"
    },
    {
      name: "scr004",
      type: "tmx",
      src: "maps/scr004.tmx"
    },
    {
      name: "scr005",
      type: "tmx",
      src: "maps/scr005.tmx"
    },
    {
      name: "scr006",
      type: "tmx",
      src: "maps/scr006.tmx"
    },
    {
      name: "scr007",
      type: "tmx",
      src: "maps/scr007.tmx"
    },
    {
      name: "scr008",
      type: "tmx",
      src: "maps/scr008.tmx"
    },
    {
      name: "scr009",
      type: "tmx",
      src: "maps/scr009.tmx"
    },
    {
      name: "scr010",
      type: "tmx",
      src: "maps/scr010.tmx"
    },
    {
      name: "scr011",
      type: "tmx",
      src: "maps/scr011.tmx"
    },
    {
      name: "scr012",
      type: "tmx",
      src: "maps/scr012.tmx"
    },
    {
      name: "scr013",
      type: "tmx",
      src: "maps/scr013.tmx"
    },
    {
      name: "scr014",
      type: "tmx",
      src: "maps/scr014.tmx"
    },
    {
      name: "scr015",
      type: "tmx",
      src: "maps/scr015.tmx"
    },
    {
      name: "scr016",
      type: "tmx",
      src: "maps/scr016.tmx"
    },
    {
      name: "scr017",
      type: "tmx",
      src: "maps/scr017.tmx"
    },
    {
      name: "scr018",
      type: "tmx",
      src: "maps/scr018.tmx"
    },
    {
      name: "scr019",
      type: "tmx",
      src: "maps/scr019.tmx"
    },
    {
      name: "scr020",
      type: "tmx",
      src: "maps/scr020.tmx"
    },
    {
      name: "scr021",
      type: "tmx",
      src: "maps/scr021.tmx"
    },
    {
      name: "scr022",
      type: "tmx",
      src: "maps/scr022.tmx"
    },
    {
      name: "scr023",
      type: "tmx",
      src: "maps/scr023.tmx"
    },
    {
      name: "scr024",
      type: "tmx",
      src: "maps/scr024.tmx"
    },
    {
      name: "scr025",
      type: "tmx",
      src: "maps/scr025.tmx"
    },
    {
      name: "scr026",
      type: "tmx",
      src: "maps/scr026.tmx"
    },
    {
      name: "scr027",
      type: "tmx",
      src: "maps/scr027.tmx"
    },
    {
      name: "scr028",
      type: "tmx",
      src: "maps/scr028.tmx"
    },
    {
      name: "scr029",
      type: "tmx",
      src: "maps/scr029.tmx"
    },
    {
      name: "scr030",
      type: "tmx",
      src: "maps/scr030.tmx"
    },
    {
      name: "scr031",
      type: "tmx",
      src: "maps/scr031.tmx"
    },
    {
      name: "scr032",
      type: "tmx",
      src: "maps/scr032.tmx"
    },
    {
      name: "scr033",
      type: "tmx",
      src: "maps/scr033.tmx"
    },
    {
      name: "scr034",
      type: "tmx",
      src: "maps/scr034.tmx"
    },
    {
      name: "scr035",
      type: "tmx",
      src: "maps/scr035.tmx"
    },
    {
      name: "scr036",
      type: "tmx",
      src: "maps/scr036.tmx"
    },
    {
      name: "scr037",
      type: "tmx",
      src: "maps/scr037.tmx"
    },
    {
      name: "scr038",
      type: "tmx",
      src: "maps/scr038.tmx"
    },
    {
      name: "scr039",
      type: "tmx",
      src: "maps/scr039.tmx"
    },
    {
      name: "scr040",
      type: "tmx",
      src: "maps/scr040.tmx"
    },
    {
      name: "scr041",
      type: "tmx",
      src: "maps/scr041.tmx"
    },
    {
      name: "scr042",
      type: "tmx",
      src: "maps/scr042.tmx"
    },
    {
      name: "scr043",
      type: "tmx",
      src: "maps/scr043.tmx"
    },
    {
      name: "scr044",
      type: "tmx",
      src: "maps/scr044.tmx"
    },
    {
      name: "scr045",
      type: "tmx",
      src: "maps/scr045.tmx"
    },
    {
      name: "scr046",
      type: "tmx",
      src: "maps/scr046.tmx"
    },
    {
      name: "scr047",
      type: "tmx",
      src: "maps/scr047.tmx"
    },
    {
      name: "scr048",
      type: "tmx",
      src: "maps/scr048.tmx"
    },
    {
      name: "scr049",
      type: "tmx",
      src: "maps/scr049.tmx"
    },
    {
      name: "scr050",
      type: "tmx",
      src: "maps/scr050.tmx"
    },
    {
      name: "scr051",
      type: "tmx",
      src: "maps/scr051.tmx"
    },
    {
      name: "scr052",
      type: "tmx",
      src: "maps/scr052.tmx"
    },
    {
      name: "scr053",
      type: "tmx",
      src: "maps/scr053.tmx"
    },
    {
      name: "scr054",
      type: "tmx",
      src: "maps/scr054.tmx"
    },
    {
      name: "scr055",
      type: "tmx",
      src: "maps/scr055.tmx"
    },
    {
      name: "scr056",
      type: "tmx",
      src: "maps/scr056.tmx"
    },
    {
      name: "scr057",
      type: "tmx",
      src: "maps/scr057.tmx"
    },
    {
      name: "scr058",
      type: "tmx",
      src: "maps/scr058.tmx"
    },
    {
      name: "scr059",
      type: "tmx",
      src: "maps/scr059.tmx"
    },
    {
      name: "scr060",
      type: "tmx",
      src: "maps/scr060.tmx"
    },
    {
      name: "scr061",
      type: "tmx",
      src: "maps/scr061.tmx"
    },
    {
      name: "scr062",
      type: "tmx",
      src: "maps/scr062.tmx"
    },
    {
      name: "scr063",
      type: "tmx",
      src: "maps/scr063.tmx"
    },
    {
      name: "scr064",
      type: "tmx",
      src: "maps/scr064.tmx"
    },
    {
      name: "scr065",
      type: "tmx",
      src: "maps/scr065.tmx"
    },
    {
      name: "scr066",
      type: "tmx",
      src: "maps/scr066.tmx"
    },
    {
      name: "scr067",
      type: "tmx",
      src: "maps/scr067.tmx"
    },
    {
      name: "scr068",
      type: "tmx",
      src: "maps/scr068.tmx"
    },
    {
      name: "scr069",
      type: "tmx",
      src: "maps/scr069.tmx"
    },
    {
      name: "scr070",
      type: "tmx",
      src: "maps/scr070.tmx"
    },
    {
      name: "scr071",
      type: "tmx",
      src: "maps/scr071.tmx"
    },
    {
      name: "scr072",
      type: "tmx",
      src: "maps/scr072.tmx"
    },
    {
      name: "scr073",
      type: "tmx",
      src: "maps/scr073.tmx"
    },
    {
      name: "scr074",
      type: "tmx",
      src: "maps/scr074.tmx"
    },
    {
      name: "scr075",
      type: "tmx",
      src: "maps/scr075.tmx"
    },
    
    // audio
    {
      name: "bounce",
      type: "audio",
      src: "audio/",
      channel: 1,
    },
    {
      name: "bounce2",
      type: "audio",
      src: "audio/",
      channel: 2
    },
    {
      name: "tube",
      type: "audio",
      src: "audio/",
      channel: 1,
    },
    {
      name: "disappear",
      type: "audio",
      src: "audio/",
      channel: 1,
    },
    {
      name: "drown",
      type: "audio",
      src: "audio/",
      channel: 1,
    },
    {
      name: "points",
      type: "audio",
      src: "audio/",
      channel: 1,
    },
    {
      name: "timeaward",
      type: "audio",
      src: "audio/",
      channel: 2,
    },
  ];
  
  return resources;
});
