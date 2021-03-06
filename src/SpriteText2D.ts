import THREE = require("three");
import { Text2D, AlignmentMethod } from "./Text2D";

export class SpriteText2D extends Text2D{

  public sprite: THREE.Sprite;

  get defaultAlignmentMethod(): AlignmentMethod {
    return "texture";
  }

  raycast () {
    return this.sprite.raycast.apply(this.sprite, arguments)
  }

  updateText() {
    this.canvas.drawText(this._text, this.textOptions)

    // cleanup previous texture
    this.cleanUp()

    this.texture = new THREE.Texture(this.canvas.canvas);
    this.texture.needsUpdate = true;
    this.applyAntiAlias()

    if (!this.material) {
      this.material = new THREE.SpriteMaterial({ map: this.texture });

    } else {
      this.material.map = this.texture
    }

    if (!this.sprite) {
      this.sprite = new THREE.Sprite( this.material )
      this.geometry = this.sprite.geometry
      this.add(this.sprite)
    }

    this.sprite.scale.set(this.canvas.width, this.canvas.height, 1)

    if (this.alignmentMethod == "child") {
      this.sprite.position.x = ((this.canvas.width/2) - (this.canvas.textWidth/2)) + ((this.canvas.textWidth/2) * this.align.x)
      this.sprite.position.y = (- this.canvas.height/2) + ((this.canvas.textHeight/2) * this.align.y)
    }
  }

}
