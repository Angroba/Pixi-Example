import { Application, Container, Graphics, Text } from 'pixi.js';
import crossTexture from '../assets/img/cross.png';
import circleTexture from '../assets/img/circle.png';
import { Utils } from './utils';
import { Howl } from 'howler';
import mp3 from '../assets/audio/tnt.mp3';
import anime, { stagger } from 'animejs';
import { Button} from '../app';

//const creeper = sound.Sound.from("../assets/snd/tnt.mp3")
let step = 0
var win = false
export { win }; 
let array: any = []
const utils = new Utils()
const height = 100;
const width = 100;
const sound = new Howl({
    src: [mp3],
    // loop:true,
});

let xWin = new Text('X win');

xWin.x = 50;
xWin.y = 300;
xWin.alpha = 0
utils.animeAlpha(xWin, 1, 1500, true)

let yWin = new Text('Y win');
yWin.x = 50;
yWin.y = 300;
yWin.alpha = 0
utils.animeAlpha(yWin, 1, 1500, true)

let winTextX = () => {}
let winTextY = () => {}
let isClosedFunc = () => { }
let winFunc = () => {}
let setFalse = () => {} 


export class Greed extends Container {

    private positionConfig = {
        id: 0
    }
    constructor() {
        super()
        
        this.pivot.x = this.width / 2;
        this.pivot.y = this.height / 2;
        
        this.createGreed()
        // this.createText()
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
                duration: 8000,
                easing: 'linear',
                // direction: "alternate",
                // loop: true,
            })
        }
        winTextX = ():void => {
            this.addChild(xWin)
        }

        winTextY = ():void => {
            this.addChild(yWin)
        }
       
        
    }

        //     createText = () => {
        //         let basicText = new Text('Basic text in pixi');
        //         basicText.x = 50;
        //         basicText.y = 300;
        //         basicText.alpha = 0
        //         utils.animeAlpha(basicText, 1, 1500, true)
        //         this.addChild(basicText);
        // }

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
    

    bot = () => {
        const margin = (this.height - 100 * 3) / 2;
        this.y = margin;
        this.x = Math.round(this.width - 150 * 5);
     
        const bottom = new Graphics();
        bottom.beginFill(0, 1);
        bottom.drawRect(0, 100 * 3 + margin, this.width, margin);
        this.addChild(bottom)
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
function endGame(array:any) {

    //horizontal
    if ((array[0] === 'x') && (array[1] === 'x') && (array[2] === 'x')) {
        soundChecker()
        isClosedFunc()
        winFunc()
        winTextX()
        Button.interactive = true;
        Button.buttonMode = true;
        Button.alpha = 1
        console.log(win);
        
    
        return true 
        


        
    }
    if ((array[3] === 'x') && (array[4] === 'x') && (array[5] === 'x')) {
        soundChecker()
        isClosedFunc()
        winFunc()
        winTextX()
        win = true

        return true 
    }
    if ((array[5] === 'x') && (array[6] === 'x') && (array[7] === 'x')) {
        soundChecker()
        isClosedFunc()
        winFunc()
        winTextX()
        win = true

        return true 
    }
    //diag
    if ((array[0] === 'x') && (array[4] === 'x') && (array[8] === 'x')) {
        soundChecker()
        isClosedFunc()
        winFunc()
        winTextX()
        win = true

        return true 
    }
    if ((array[2] === 'x') && (array[4] === 'x') && (array[6] === 'x')) {
        soundChecker()
        isClosedFunc()
        winFunc()
        winTextX()
        win = true

        return true 
    }
    //vertical
    if ((array[0] === 'x') && (array[3] === 'x') && (array[6] === 'x')) {
        soundChecker()
        isClosedFunc()
        winFunc()
        winTextX()
        win = true

        return true 
    }
    if ((array[1] === 'x') && (array[4] === 'x') && (array[7] === 'x')) {
        soundChecker()
        isClosedFunc()
        winFunc()
        winTextX()
        win = true

        return true 
    }
    if ((array[2] === 'x') && (array[5] === 'x') && (array[8] === 'x')) {
        soundChecker()
        isClosedFunc()
        winFunc()
        winTextX()
        win = true

        return true 
    }




    if ((array[0] === 'o') && (array[1] === 'o') && (array[2] === 'o')) {

        soundChecker()
        isClosedFunc()
        winFunc()
        winTextY()
        win = true


        return true 


    }
    if ((array[3] === 'o') && (array[4] === 'o') && (array[5] === 'o')) {
        soundChecker()
        isClosedFunc()
        winFunc()
        winTextY()
        win = true

        return true 
    }
    if ((array[5] === 'o') && (array[6] === 'o') && (array[7] === 'o')) {
        soundChecker()
        isClosedFunc()
        winFunc()
        winTextY()
        win = true

        return true 
    }
    //diag
    if ((array[0] === 'o') && (array[4] === 'o') && (array[8] === 'o')) {
        soundChecker()
        isClosedFunc()
        winFunc()
        winTextY()
        win = true

        return true 
    }
    if ((array[2] === 'o') && (array[4] === 'o') && (array[6] === 'o')) {
        soundChecker()
        isClosedFunc()
        winFunc()
        winTextY()
        win = true

        return true 
    }
    //vertical
    if ((array[0] === 'o') && (array[1] === 'o') && (array[2] === 'o')) {
        soundChecker()
        isClosedFunc()
        winFunc()
        winTextY()
        win = true

        return true 
    }
    if ((array[3] === 'o') && (array[4] === 'o') && (array[5] === 'o')) {
        soundChecker()
        isClosedFunc()
        winFunc()
        winTextY()
        win = true

        return true 
    }
    if ((array[5] === 'o') && (array[6] === 'o') && (array[7] === 'o')) {
        soundChecker()
        isClosedFunc()
        winFunc()
        winTextY()
        win = true

        return true 
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

