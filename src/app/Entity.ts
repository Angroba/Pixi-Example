/* eslint-disable no-param-reassign */
import {
  Sprite, Texture, Resource,
} from 'pixi.js';
import { Utils } from './utils';

const utils = new Utils()

export type Entity = {
  sprite: Sprite;
  speed: number;
  direction: 'left' | 'right';
}

export const createEntity = (texture: any, x: number, y: number): Entity => {
 const sprite = utils.newSprite(texture)// create sprite
  sprite.anchor.set(0.5); // center origin of sprite
  sprite.y = y; // center in canvas
  sprite.x = x;
  return {
    sprite,
    speed: 2,
    direction: 'right',
  };
};

export const getNextEntityDirection = (viewWidth: number, c: Entity): 'left' | 'right' => {
  if (c.sprite.x >= viewWidth) {
    return 'left';
  }
  if (c.sprite.x <= 0) {
    return 'right';
  }
  return c.direction;
};

export const getNextEntityPosition = (c: Entity): number => {
  if (c.direction === 'right') {
    return c.sprite.x + c.speed;
  }
  return c.sprite.x - c.speed;
};
