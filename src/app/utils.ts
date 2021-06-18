import anime from 'animejs';
import { Sprite, Texture } from 'pixi.js';

export class Utils {
  constructor() {
  }

  public newSprite = (asset: any) => {
    const img = Texture.from(asset);
    const sp = new Sprite(img);
    return sp
  }

  public animeAlpha = (object: any, alpha: number, duration: number, loop: boolean) => {
    anime({
      targets: object,
      alpha: alpha,
      duration: duration,
      easing: 'linear',
      loop: loop
    })
  }
}
