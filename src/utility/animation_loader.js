export function processAnimations(scene, animations) {
    let { anims } = scene;
    for(let animation of animations) {
        anims.create({
            key: animation.key,
            frameRate: 10,
            repeat: -1,
            frames: anims.generateFrameNames(
                animation.atlas, 
                {
                    prefix: animation.key,
                    suffix: '.png',
                    start : 0,
                    end   : 3
                }
            )
        })
    }
}