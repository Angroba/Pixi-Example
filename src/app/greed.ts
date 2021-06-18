import { Container, Graphics } from 'pixi.js';
import crossTexture from '../assets/img/cross.png';
import circleTexture from '../assets/img/circle.png';
import { Utils } from './utils';
import { Howl } from 'howler'
import mp3 from '../assets/audio/tnt.mp3'
import anime from 'animejs';

//const creeper = sound.Sound.from("../assets/snd/tnt.mp3")
let step = 0
let array: any = []
const utils = new Utils()
const height = 100;
const width = 100;
const sound = new Howl({
    src: [mp3],
    // loop:true,
});
let isClosedFunc = () => { }
let winFunc = () => { }


export class Greed extends Container {

    private positionConfig = {
        id: 0
    }
    constructor() {
        super()
        this.pivot.x = this.width / 2;
        this.pivot.y = this.height / 2;
        this.createGreed()
        isClosedFunc = (): void => {
            console.log('isClosed')
            for (let i = 0; i < 9; i++) {
                this.children[i].interactive = false
            }
        }
        winFunc = (): void => {
            anime({
                targets: this,
                alpha: 0,
                duration: 4000,
                easing: 'linear',
                // direction: "alternate",
                // loop: true,
            })
        }
    }



    createGreed = () => {
        for (let i = 0; i < 9; i++) {
            const id = this.positionConfig.id + i;
            const GenerateTile = this.createNewTile()
            GenerateTile.x = (i % 3) * 100
            GenerateTile.y = Math.floor(i / 3) * 100
            GenerateTile.name = `tile ${i}`
            console.log(GenerateTile.name)
            array.push(GenerateTile.name)
            this.addChild(GenerateTile)
        }
    }




    onClick(event: any) {
        console.log(event.target)
        let clicked = false
        if (!clicked) {
            if (step % 2 === 0) {
                event.target.addChild(Cross())
                event.target.buttonMode = false;
                event.target.interactive = false;
                for (let i = 0; i < 9; i++) {
                    console.log()
                    if (array[i] === event.target.name)
                        array.splice(i, 1, "x")
                }
                // this.array = "x"
            } else {
                event.target.addChild(Circle())
                event.target.buttonMode = false;
                event.target.interactive = false;
                for (let i = 0; i < 9; i++) {
                    console.log()
                    if (array[i] === event.target.name)
                        array.splice(i, 1, "o")
                }
                // this.array = "o"
            }
            step++

            console.log(event.target.name)
            endGame(array)
            // console.log(isClosed)

        }
        clicked = true
    }

    public createNewTile = () => {
        const graphics = new Graphics
        const container = new Container()
        graphics.lineStyle(2, 0xFFFFFF, 1);
        graphics.beginFill(0x34eb8f);
        graphics.drawRect(0, 0, width, height);
        graphics.endFill();
        container.addChild(graphics)
        container.pivot.set(0.5)
        container.buttonMode = true;
        container.interactive = true;
        container.on('click', this.onClick)
        return container
    }
}

let soundChek = false
function endGame(array: any) {

    //horizontal
    if ((array[0] === 'x') && (array[1] === 'x') && (array[2] === 'x')) {
        soundChecker()
        isClosedFunc()
        winFunc()


        alert('x = win')
    }
    if ((array[3] === 'x') && (array[4] === 'x') && (array[5] === 'x')) {
        soundChecker()
        alert('x = win')
    }
    if ((array[5] === 'x') && (array[6] === 'x') && (array[7] === 'x')) {
        soundChecker()
        alert('x = win')
    }
    //diag
    if ((array[0] === 'x') && (array[4] === 'x') && (array[8] === 'x')) {
        soundChecker()
        alert('x = win')
    }
    if ((array[2] === 'x') && (array[4] === 'x') && (array[6] === 'x')) {
        soundChecker()
        alert('x = win')
    }
    //vertical
    if ((array[0] === 'x') && (array[3] === 'x') && (array[6] === 'x')) {
        soundChecker()
        alert('x = win')
    }
    if ((array[1] === 'x') && (array[4] === 'x') && (array[7] === 'x')) {
        soundChecker()
        alert('x = win')
    }
    if ((array[2] === 'x') && (array[5] === 'x') && (array[8] === 'x')) {
        soundChecker()
        alert('x = win')
    }




    if ((array[0] === 'o') && (array[1] === 'o') && (array[2] === 'o')) {

        soundChecker()
        isClosedFunc()
        winFunc()
        alert('o = win')


    }
    if ((array[3] === 'o') && (array[4] === 'o') && (array[5] === 'o')) {
        alert('o = win')
        soundChecker()
    }
    if ((array[5] === 'o') && (array[6] === 'o') && (array[7] === 'o')) {
        alert('o = win')
    }
    //diag
    if ((array[0] === 'o') && (array[4] === 'o') && (array[8] === 'o')) {
        soundChecker()
        alert('o = win')
    }
    if ((array[2] === 'o') && (array[4] === 'o') && (array[6] === 'o')) {
        soundChecker()
        alert('o = win')
    }
    //vertical
    if ((array[0] === 'o') && (array[1] === 'o') && (array[2] === 'o')) {
        soundChecker()
        alert('o = win')
    }
    if ((array[3] === 'o') && (array[4] === 'o') && (array[5] === 'o')) {
        soundChecker()
        alert('o = win')
    }
    if ((array[5] === 'o') && (array[6] === 'o') && (array[7] === 'o')) {
        soundChecker()
        alert('o = win')
    }

}


function soundChecker() {

    if (!soundChek) {
        sound.play()
        console.log('SOUND HERE')
    }
    soundChek = true;


}



function Cross() {
    const container = new Container()
    const sprite = utils.newSprite(crossTexture)
    sprite.alpha = 0
    sprite.width = width;
    sprite.height = height;
    utils.animeAlpha(sprite, 1, 500, false)
    container.addChild(sprite)
    return container
}

function Circle() {
    const container = new Container()
    const sprite = utils.newSprite(circleTexture)
    sprite.alpha = 0
    sprite.width = width;
    sprite.height = height;
    utils.animeAlpha(sprite, 1, 500, false)
    container.addChild(sprite)
    return container
}

