import Monster from './monster.js';
import {processAnimations} from '../utility/animation_loader.js';

let animations = [
    {
        key: 'swampy_idle_anim_f',
        atlas: 'atlas'
    }, 
    {
        key: 'swampy_run_anim_f',
        atlas: 'atlas'
    }
];

function distance(x, y, dx, dy) {
    return Math.sqrt(Math.pow(dx - x, 2) + Math.pow(dy - y, 2));
}

export default class SwampThing extends Monster{
    constructor(scene, x, y, speed, direction, distance) {
        let sprite = scene.physics.add.sprite(x, y, '')
        super(scene, sprite);
        processAnimations(this.scene, animations);
        this.sprite.anims.play('swampy_idle_anim_f')
        this.speed = speed;
        this.direction = direction;
        this.distance = distance;
        this.initialPosition = {
            x: this.sprite.x,
            y: this.sprite.y
        }
        this.hp = 1;

        this.state = "patrolling"
    }

    decreaseHP(hp) {
        this.hp -= hp;
    }

    update() {
        if(this.hp === 0) this.sprite.destroy();
        else {
            if(this.state === "patrolling") {
                let {x, y} = this.initialPosition;
                let distTraveled = distance(x, y, this.sprite.x, this.sprite.y)
    
                let vel = new Phaser.Math.Vector2(this.direction.x, this.direction.y).normalize().scale(this.speed);
                this.sprite.setVelocity(vel.x, vel.y);
    
                if(distTraveled > this.distance) {
                    this.initialPosition = {
                        x: this.sprite.x,
                        y: this.sprite.y
                    }
    
                    this.speed *= -1;
                    this.sprite.flipX = !this.sprite.flipX;
                }
            }
        }
    }
}