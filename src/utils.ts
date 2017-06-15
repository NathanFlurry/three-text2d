import THREE = require("three");

export const textAlign = {
  center: new THREE.Vector2(0.5, 0.5),
  left: new THREE.Vector2(1, 0.5),
  topLeft: new THREE.Vector2(1, 1),
  topRight: new THREE.Vector2(0, 1),
  right: new THREE.Vector2(0, 0),
  bottomLeft: new THREE.Vector2(0, 0),
  bottomRight: new THREE.Vector2(0, 0),
}


var fontHeightCache: { [id: string]: number; } = {};

export function getFontHeight (fontStyle: string) {
  var result = fontHeightCache[fontStyle];

  if (!result)
  {
    var body = document.getElementsByTagName('body')[0];
    var dummy = document.createElement('div');

    var dummyText = document.createTextNode('MÉq');
    dummy.appendChild(dummyText);
    dummy.setAttribute('style', `font:${ fontStyle };position:absolute;top:0;left:0`);
    body.appendChild(dummy);
    result = dummy.offsetHeight;

    fontHeightCache[fontStyle] = result;
    body.removeChild(dummy);
  }

  return result;
}
