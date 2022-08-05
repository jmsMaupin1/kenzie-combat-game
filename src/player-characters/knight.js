import Player from './player.js';
import Fireball from '../fireball.js';
import { processAnimations } from '../utility/animation_loader.js';

let animationNames = [
    {
        key: 'knight_f_idle_anim_f',
        atlas: 'atlas'
    },
    {
        key: 'knight_f_hit_anim_f',
        atlas: 'atlas'
    },
    {
        key: 'knight_f_run_anim_f',
        atlas: 'atlas'
    },
    {
        key: 'knight_m_idle_anim_f',
        atlas: 'atlas'
    },
    {
        key: 'knight_m_run_anim_f',
        atlas: 'atlas'
    }
]

let weapon, fireball, waitCounter = 0, maxWaitCounter = 30, primed = true;

export default class Knight extends Player{
    constructor(scene, x, y, speed) {
        let sprite = scene.physics.add.sprite(x, y, 'atlas', 'knight_f_idle_anim_f0.png');

        super(scene, sprite, speed);

        const { LEFT, RIGHT, UP, DOWN, W, A, S, D } = Phaser.Input.Keyboard.KeyCodes;

        this.keys = scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            down: DOWN,
            w: W,
            a: A,
            s: S,
            d: D,
        })
          
        fireball = new Fireball(scene, "fireball01.png", "fireball" )
        
        processAnimations(scene, animationNames)
    }

    update() {
        super.update(this.keys);
        let { sprite, scene } = this;
        let { isDown } = scene.input.mousePointer;
        let pointerX = scene.input.mousePointer.worldX;
        let pointerY = scene.input.mousePointer.worldY;
        
        if(sprite.body.velocity.x === 0 && sprite.body.velocity.y === 0)
            sprite.anims.play('knight_f_idle_anim_f', true);
        else
            sprite.anims.play('knight_f_run_anim_f', true);

        if(isDown && primed) {
            let {x, y} = {
                x: pointerX - (this.sprite.x + 10),
                y: pointerY - (this.sprite.y + 20)
            }

            if(x !== 0 && y !== 0)
                fireball.fire(this.sprite.x + 10, this.sprite.y + 20, x, y)
                
            primed = false;
        } else if(!primed) {
            if(maxWaitCounter < waitCounter) {
                primed = true;
                waitCounter = 0;
            } else waitCounter++;
        }        

    }

    destroy() {
        super.destroy();
    }

    addCollision(layer, callback) {
        super.addCollision(layer, callback);
    }

    addAttackCollision(group) {
        fireball.addCollision(group)
    }

    addAttackOverlap(sprite, cb) {
        fireball.addAttackOverlap(sprite, cb);
    }
}