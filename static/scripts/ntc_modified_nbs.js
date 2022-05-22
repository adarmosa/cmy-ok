// MODIFICATIONS LOCATED TOWARD END OF SCRIPT //

/*

+-----------------------------------------------------------------+
|     Created by Chirag Mehta - http://chir.ag/projects/ntc       |
|-----------------------------------------------------------------|
|               ntc js (Name that Color JavaScript)               |
+-----------------------------------------------------------------+

All the functions, code, lists etc. have been written specifically
for the Name that Color JavaScript by Chirag Mehta unless otherwise
specified.

This script is released under the: Creative Commons License:
Attribution 2.5 http://creativecommons.org/licenses/by/2.5/

Sample Usage:

  <script type="text/javascript" src="ntc.js"></script>

  <script type="text/javascript">

    var n_match  = ntc.name("#6195ED");
    n_rgb        = n_match[0]; // This is the RGB value of the closest matching color
    n_name       = n_match[1]; // This is the text string for the name of the match
    n_exactmatch = n_match[2]; // True if exact color match, False if close-match

    alert(n_match);

  </script>

*/

var ntc = {

  init: function() {
    var color, rgb, hsl;
    for(var i = 0; i < ntc.names.length; i++)
    {
      color = "#" + ntc.names[i][0];
      rgb = ntc.rgb(color);
      hsl = ntc.hsl(color);
      ntc.names[i].push(rgb[0], rgb[1], rgb[2], hsl[0], hsl[1], hsl[2]);
    }
  },

  name: function(color) {

    color = color.toUpperCase();
    if(color.length < 3 || color.length > 7)
      return ["#000000", "Invalid Color: " + color, false];
    if(color.length % 3 == 0)
      color = "#" + color;
    if(color.length == 4)
      color = "#" + color.substr(1, 1) + color.substr(1, 1) + color.substr(2, 1) + color.substr(2, 1) + color.substr(3, 1) + color.substr(3, 1);

    var rgb = ntc.rgb(color);
    var r = rgb[0], g = rgb[1], b = rgb[2];
    var hsl = ntc.hsl(color);
    var h = hsl[0], s = hsl[1], l = hsl[2];
    var ndf1 = 0; ndf2 = 0; ndf = 0;
    var cl = -1, df = -1;

    for(var i = 0; i < ntc.names.length; i++)
    {
      if(color == "#" + ntc.names[i][0])
        return ["#" + ntc.names[i][0], ntc.names[i][1], true];

      ndf1 = Math.pow(r - ntc.names[i][2], 2) + Math.pow(g - ntc.names[i][3], 2) + Math.pow(b - ntc.names[i][4], 2);
      ndf2 = Math.pow(h - ntc.names[i][5], 2) + Math.pow(s - ntc.names[i][6], 2) + Math.pow(l - ntc.names[i][7], 2);
      ndf = ndf1 + ndf2 * 2;
      if(df < 0 || df > ndf)
      {
        df = ndf;
        cl = i;
      }
    }

    return (cl < 0 ? ["#000000", "Invalid Color: " + color, false] : ["#" + ntc.names[cl][0], ntc.names[cl][1], false]);
  },

  // adopted from: Farbtastic 1.2
  // http://acko.net/dev/farbtastic
  hsl: function (color) {

    var rgb = [parseInt('0x' + color.substring(1, 3)) / 255, parseInt('0x' + color.substring(3, 5)) / 255, parseInt('0x' + color.substring(5, 7)) / 255];
    var min, max, delta, h, s, l;
    var r = rgb[0], g = rgb[1], b = rgb[2];

    min = Math.min(r, Math.min(g, b));
    max = Math.max(r, Math.max(g, b));
    delta = max - min;
    l = (min + max) / 2;

    s = 0;
    if(l > 0 && l < 1)
      s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));

    h = 0;
    if(delta > 0)
    {
      if (max == r && max != g) h += (g - b) / delta;
      if (max == g && max != b) h += (2 + (b - r) / delta);
      if (max == b && max != r) h += (4 + (r - g) / delta);
      h /= 6;
    }
    return [parseInt(h * 255), parseInt(s * 255), parseInt(l * 255)];
  },

  // adopted from: Farbtastic 1.2
  // http://acko.net/dev/farbtastic
  rgb: function(color) {
    return [parseInt('0x' + color.substring(1, 3)), parseInt('0x' + color.substring(3, 5)),  parseInt('0x' + color.substring(5, 7))];
  },

  // MODIFICATIONS BELOW //
  // Modified to read from NBS/ISCC color dictionary
  // NBS/ISCC color dictionary values sourced from: https://people.csail.mit.edu/jaffer/Color/Dictionaries#nbs-iscc
  // Converted from csv to json using: https://www.convertcsv.com/csv-to-json.htm
  names: [
["ffb5ba", "vivid pink"],
["ea9399", "strong pink"],
["e4717a", "deep pink"],
["f9ccca", "light pink"],
["dea5a4", "moderate pink"],
["c08081", "dark pink"],
["ead8d7", "pale pink"],
["c4aead", "grayish pink"],
["eae3e1", "pinkish white"],
["c1b6b3", "pinkish gray"],
["be0032", "vivid red"],
["bc3f4a", "strong red"],
["841b2d", "deep red"],
["5c0923", "very deep red"],
["ab4e52", "moderate red"],
["722f37", "dark red"],
["3f1728", "very dark red"],
["ad8884", "light grayish red"],
["905d5d", "grayish red"],
["543d3f", "dark grayish red"],
["2e1d21", "blackish red"],
["8f817f", "reddish gray"],
["5c504f", "dark reddish gray"],
["282022", "reddish black"],
["ffb7a5", "vivid yellowish pink"],
["f99379", "strong yellowish pink"],
["e66721", "deep yellowish pink"],
["f4c2c2", "light yellowish pink"],
["d9a6a9", "moderate yellowish pink"],
["c48379", "dark yellowish pink"],
["ecd5c5", "pale yellowish pink"],
["c7ada3", "grayish yellowish pink"],
["c2ac99", "brownish pink"],
["e25822", "vivid reddish orange"],
["d9603b", "strong reddish orange"],
["aa381e", "deep reddish orange"],
["cb6d51", "moderate reddish orange"],
["9e4732", "dark reddish orange"],
["b4745e", "grayish reddish orange"],
["882d17", "strong reddish brown"],
["56070c", "deep reddish brown"],
["a87c6d", "light reddish brown"],
["79443b", "moderate reddish brown"],
["3e1d1e", "dark reddish brown"],
["977f73", "light grayish reddish brown"],
["674c47", "grayish reddish brown"],
["43302e", "dark grayish reddish brown"],
["f38400", "vivid orange"],
["fd943f", "brilliant orange"],
["ed872d", "strong orange"],
["be6516", "deep orange"],
["fab57f", "light orange"],
["d99058", "moderate orange"],
["ae6938", "brownish orange"],
["80461b", "strong brown"],
["593319", "deep brown"],
["a67b5b", "light brown"],
["6f4e37", "moderate brown"],
["422518", "dark brown"],
["958070", "light grayish brown"],
["635147", "grayish brown"],
["3e322c", "dark grayish brown"],
["8e8279", "light brownish gray"],
["5b504f", "brownish gray"],
["28201c", "brownish black"],
["f6a600", "vivid orange yellow"],
["ffc14f", "brilliant orange yellow"],
["eaa221", "strong orange yellow"],
["c98500", "deep orange yellow"],
["fbc97f", "light orange yellow"],
["e3a857", "moderate orange yellow"],
["be8a3d", "dark orange yellow"],
["fad6a5", "pale orange yellow"],
["996515", "strong yellowish brown"],
["654522", "deep yellowish brown"],
["c19a6b", "light yellowish brown"],
["826644", "moderate yellowish brown"],
["4b3621", "dark yellowish brown"],
["ae9b82", "light grayish yellowish brown"],
["7e6d5a", "grayish yellowish brown"],
["483c32", "dark grayish yellowish brown"],
["f3c300", "vivid yellow"],
["fada5e", "brilliant yellow"],
["d4af37", "strong yellow"],
["af8d13", "deep yellow"],
["f8de7e", "light yellow"],
["c9ae5d", "moderate yellow"],
["ab9144", "dark yellow"],
["f3e5ab", "pale yellow"],
["c2b280", "grayish yellow"],
["a18f60", "dark grayish yellow"],
["f0ead6", "yellowish white"],
["bfb8a5", "yellowish gray"],
["967117", "light olive brown"],
["6c541e", "moderate olive brown"],
["3b3121", "dark olive brown"],
["dcd300", "vivid greenish yellow"],
["e9e450", "brilliant greenish yellow"],
["beb72e", "strong greenish yellow"],
["9b9400", "deep greenish yellow"],
["eae679", "light greenish yellow"],
["b9b459", "moderate greenish yellow"],
["98943e", "dark greenish yellow"],
["ebe8a4", "pale greenish yellow"],
["b9b57d", "grayish greenish yellow"],
["867e36", "light olive"],
["665d1e", "moderate olive"],
["403d21", "dark olive"],
["8c8767", "light grayish olive"],
["5b5842", "grayish olive"],
["363527", "dark grayish olive"],
["8a8776", "light olive gray"],
["57554c", "olive gray"],
["25241d", "olive black"],
["8db600", "vivid yellow green"],
["bdda57", "brilliant yellow green"],
["7e9f2e", "strong yellow green"],
["467129", "deep yellow green"],
["c9dc89", "light yellow green"],
["8a9a5b", "moderate yellow green"],
["dadfb7", "pale yellow green"],
["8f9779", "grayish yellow green"],
["404f00", "strong olive green"],
["232f00", "deep olive green"],
["4a5d23", "moderate olive green"],
["2b3d26", "dark olive green"],
["515744", "grayish olive green"],
["31362b", "dark grayish olive green"],
["27a64c", "vivid yellowish green"],
["83d37d", "brilliant yellowish green"],
["44944a", "strong yellowish green"],
["00622d", "deep yellowish green"],
["003118", "very deep yellowish green"],
["b6e5af", "very light yellowish green"],
["93c592", "light yellowish green"],
["679267", "moderate yellowish green"],
["355e3b", "dark yellowish green"],
["173620", "very dark yellowish green"],
["008856", "vivid green"],
["3eb489", "brilliant green"],
["007959", "strong green"],
["00543d", "deep green"],
["8ed1b2", "very light green"],
["6aab8e", "light green"],
["3b7861", "moderate green"],
["1b4d3e", "dark green"],
["1c352d", "very dark green"],
["c7e6d7", "very pale green"],
["8da399", "pale green"],
["5e716a", "grayish green"],
["3a4b47", "dark grayish green"],
["1a2421", "blackish green"],
["dfede8", "greenish white"],
["b2beb5", "light greenish gray"],
["7d8984", "greenish gray"],
["4e5755", "dark greenish gray"],
["1e2321", "greenish black"],
["008882", "vivid bluish green"],
["00a693", "brilliant bluish green"],
["007a74", "strong bluish green"],
["00443f", "deep bluish green"],
["96ded1", "very light bluish green"],
["66ada4", "light bluish green"],
["317873", "moderate bluish green"],
["004b49", "dark bluish green"],
["002a29", "very dark bluish green"],
["0085a1", "vivid greenish blue"],
["239eba", "brilliant greenish blue"],
["007791", "strong greenish blue"],
["2e8495", "deep greenish blue"],
["9cd1dc", "very light greenish blue"],
["66aabc", "light greenish blue"],
["367588", "moderate greenish blue"],
["004958", "dark greenish blue"],
["002e3b", "very dark greenish blue"],
["00a1c2", "vivid blue"],
["4997d0", "brilliant blue"],
["0067a5", "strong blue"],
["00416a", "deep blue"],
["a1caf1", "very light blue"],
["70a3cc", "light blue"],
["436b95", "moderate blue"],
["00304e", "dark blue"],
["bcd4e6", "very pale blue"],
["91a3b0", "pale blue"],
["536878", "grayish blue"],
["36454f", "dark grayish blue"],
["202830", "blackish blue"],
["e9e9ed", "bluish white"],
["b4bcc0", "light bluish gray"],
["81878b", "bluish gray"],
["51585e", "dark bluish gray"],
["202428", "bluish black"],
["30267a", "vivid purplish blue"],
["6c79b8", "brilliant purplish blue"],
["545aa7", "strong purplish blue"],
["272458", "deep purplish blue"],
["b3bce2", "very light purplish blue"],
["8791bf", "light purplish blue"],
["4e5180", "moderate purplish blue"],
["252440", "dark purplish blue"],
["c0c8e1", "very pale purplish blue"],
["8c92ac", "pale purplish blue"],
["4c516d", "grayish purplish blue"],
["9065ca", "vivid violet"],
["7e73b8", "brilliant violet"],
["604e97", "strong violet"],
["32174d", "deep violet"],
["dcd0ff", "very light violet"],
["8c82b6", "light violet"],
["604e81", "moderate violet"],
["2f2140", "dark violet"],
["c4c3dd", "very pale violet"],
["9690ab", "pale violet"],
["554c69", "grayish violet"],
["9a4eae", "vivid purple"],
["d399e6", "brilliant purple"],
["875692", "strong purple"],
["602f6b", "deep purple"],
["401a4c", "very deep purple"],
["d5badb", "very light purple"],
["b695c0", "light purple"],
["86608e", "moderate purple"],
["563c5c", "dark purple"],
["301934", "very dark purple"],
["d6cadd", "very pale purple"],
["aa98a9", "pale purple"],
["796878", "grayish purple"],
["50404d", "dark grayish purple"],
["291e29", "blackish purple"],
["e8e3e5", "purplish white"],
["bfb9bd", "light purplish gray"],
["8b8589", "purplish gray"],
["5d555b", "dark purplish gray"],
["242124", "purplish black"],
["870074", "vivid reddish purple"],
["9e4f88", "strong reddish purple"],
["702963", "deep reddish purple"],
["54194e", "very deep reddish purple"],
["b784a7", "light reddish purple"],
["915c83", "moderate reddish purple"],
["5d3954", "dark reddish purple"],
["341731", "very dark reddish purple"],
["aa8a9e", "pale reddish purple"],
["836479", "grayish reddish purple"],
["ffc8d6", "brilliant purplish pink"],
["e68fac", "strong purplish pink"],
["de6fa1", "deep purplish pink"],
["efbbcc", "light purplish pink"],
["d597ae", "moderate purplish pink"],
["c17e91", "dark purplish pink"],
["e8ccd7", "pale purplish pink"],
["c3a6b1", "grayish purplish pink"],
["ce4676", "vivid purplish red"],
["b3446c", "strong purplish red"],
["78184a", "deep purplish red"],
["54133b", "very deep purplish red"],
["a8516e", "moderate purplish red"],
["673147", "dark purplish red"],
["38152c", "very dark purplish red"],
["af868e", "light grayish purplish red"],
["915f6d", "grayish purplish red"],
["f2f3f4", "white"],
["ffffff", "white"],
["e6e6e6", "very light gray"],
["cccccc", "light gray"],
["b9b8b5", "light gray"],
["848482", "medium gray"],
["ababab", "medium gray"],
["828282", "darkish gray"],
["555555", "dark gray"],
["222222", "black"]
]

}

ntc.init();
