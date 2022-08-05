
import { processAnimations } from './utility/animation_loader.js';

let animations = [
    {
        key: 'fireball',
        atlas: 'fireball'
    },
    {
        key: 'bang',
        atlas: 'fireball'
    }
]

export default class Fireball {
    constructor(scene, atlas, key) {
        this.scene = scene;
        this.key = key;
        this.atlas = atlas;
        this.physicsGroup = this.scene.physics.add.group();

        processAnimations(scene, animations)
    }

    fire(x, y, dx, dy) {

        let fireball = this.physicsGroup.create(x, y, 'fireball')
        fireball
            .setScale(0.05)
            .setVelocity(dx, dy)
            .anims.play('fireball', true)
            .on("animationrepeat-bang", (anim, frame, repeat, gameObject) => {
                gameObject.disableBody(true, true);
            })

        fireball.body.velocity.normalize().scale(300);        
    }

    addCollision(group) {
        this.scene.physics.add.collider(group, this.physicsGroup, fireball => {
            fireball.setVelocity(0, 0)
            fireball.anims.play('bang', fireball)
        })
    }
    
    addAttackOverlap(monster, cb) {
        this.scene.physics.add.overlap(monster, this.physicsGroup, (monster, fireball) => {
            cb();
            fireball.setVelocity(0,0);
            fireball.anims.play('bang', fireball);
        }, null, this);

    }
}