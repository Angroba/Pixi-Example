import * as PIXI from "pixi.js";
import { DevTextureName } from './../app/asset-loader.service'

export class StandardSprite extends PIXI.Sprite {
  constructor(textureName: DevTextureName) {
    super(PIXI.Loader.shared.resources[textureName].texture);
    // PIXI.Loader.shared.resources[textureName].texture.baseTexture.update()
  }
}
