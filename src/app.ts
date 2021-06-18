import {
  Application, Loader, Resource, Text, Texture, Ticker, Sprite, Graphics
} from 'pixi.js';
import {
  createEntity, getNextEntityDirection, getNextEntityPosition,
} from './app/Entity';
import { StandardSprite } from './app/standart-sprite';
import { DevTextureName } from './app/asset-loader.service';
import heroes from '../src/assets/img/hero.png'
import { Utils } from './app/utils';
import { Greed } from './app/greed';
import anime from "animejs";
// constants
const centerWidth = window.innerWidth/ 2;
const centerHeight = window.innerHeight/ 2;

// create and append app
const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xFEE5AF,
  sharedTicker: true,
  sharedLoader: true,
  antialias: true,
});

document.body.appendChild(app.view);
const loader = Loader.shared;
const ticker = Ticker.shared;
const utils = new Utils();
const newGreed = new Greed()


function tween(){  

  //mad max
  // newGreed.x = window.innerWidth/2;
// anime({
//     targets: newGreed,
//     x: [newGreed.x, window.innerWidth],
//     duration: 3500,
//     easing: 'linear',

//     direction: "alternate",
//     loop: true
//   })
//   anime({
//     targets: newGreed,
//     y: window.innerHeight,
//     direction: "alternate",
//     duration: 3500,
//     easing: 'linear',
//     loop: true
//   })
//   anime({
//     targets: newGreed,
//     rotation: 10,
//     duration: 3500,
//     easing: 'linear',
//     loop: true,
//   })

//loading bar
// newGreed.scale.x = 0;
// anime({
// targets: newGreed.scale,
//   x: 2,
//   duration: 3500,
//   easing: 'linear',
//   loop: true,
//   direction: 'alternate',

// })

}

// when loader is ready
loader.load(() => {
  const fps = new Text('FPS: 0', { fill: 0x000000 });
  app.stage.addChild(fps);
  // create and append hero
  const hero = utils.newSprite(heroes)
  app.stage.addChild(hero, newGreed);
  

  // animate hero each "tick": go left or right continuously
  ticker.add(() => {
    fps.text = `FPS: ${ticker.FPS.toFixed(2)}`;
  });
});


