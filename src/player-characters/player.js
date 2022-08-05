

export default class Player {
    constructor(scene, sprite, speed) {
        this.scene = scene;
        this.sprite = sprite;
        this.speed  = speed;
    }

    update(keys) {
        const { sprite, speed } = this;

        sprite.setVelocity(0);

        if(keys.left.isDown || keys.a.isDown) {
            sprite.flipX = true;
            sprite.setVelocityX(-speed);
        } else if (keys.right.isDown || keys.d.isDown) {
            sprite.flipX = false;
            sprite.setVelocityX(speed);
        }

        if(keys.up.isDown || keys.w.isDown) 
            sprite.setVelocityY(-speed);
        else if(keys.down.isDown || keys.s.isDown)
            sprite.setVelocityY(speed);

        sprite.body.velocity.normalize().scale(speed);
    }

    destroy() {
        this.sprite.destroy();
    }

    addCollision(layer) {
        this.scene.physics.add.collider(this.sprite, layer)
    }
}