

export default class Monster {
    constructor(scene, sprite, speed, dist) {
        this.scene = scene;
        this.sprite = sprite;
        // this.speed = speed;
        // this.distance = dist;

        // this.state = 'patrolling'

        // this.startPosition = {
        //     x: this.sprite.x,
        //     y: this.sprite.y
        // }
    }

    destroy() {
        this.sprite.destroy();
    }

    update() {
        // if(this.state === 'patrolling') {
        //     let {x, y} = this.startPosition;
        //     let distanceTraveled = distance(x, y, this.sprite.x, this.sprite.y);

        //     this.sprite.setVelocity(this.speed, 0);
        //     if(distanceTraveled > this.distance) {
        //         this.startPosition = {
        //             x: this.sprite.x,
        //             y: this.sprite.y
        //         }

        //         this.speed *= -1;
        //         this.sprite.flipX = !this.sprite.flipX;
        //     }
        // }
    }
}