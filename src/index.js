import Knight from './player-characters/knight.js';
import Monster from './nonplayer-characters/monster.js';
import Dungeon from './dungeon.js';

let player, monster;

const config = {
    type: Phaser.Auto,
    width: 800,
    height: 600,
    pixelArt: true,
    parent: 'game-container',
    scene: Dungeon,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0}
        }
    },
    // scene: {
    //     preload: preload,
    //     create: create,
    //     update: update
    // }
};

const game = new Phaser.Game(config);

// function processAnimations( animNames, anims ) {
//     for(let animation of animNames) {
//         anims.create({
//             key: animation.key,
//             frameRate: 10,
//             repeat: -1,
//             frames: anims.generateFrameNames(animation.atlas, {
//                 prefix: animation.key,
//                 suffix: '.png',
//                 start: 0,
//                 end: 3
//             })
//         })
//     }
// }

// let animations = [
//     {
//         key: 'swampy_idle_anim_f',
//         atlas: 'atlas'
//     }, 
//     {
//         key: 'swampy_run_anim_f',
//         atlas: 'key'
//     }
// ];

// function preload() {
//     this.load.image('tiles', './src/assets/dungeon_tileset/0x72_DungeonTilesetII_v1.2.png');
//     this.load.tilemapTiledJSON('map', './src/assets/levels/level_one/level1.json');

//     this.load.atlas(
//         'fireball',
//         './src/assets/fireball/fireball_spritesheet.png',
//         './src/assets/fireball/fireball_sprite_key.json'
//     )

//     this.load.multiatlas(
//         'atlas', 
//         './src/assets/dungeon_tileset/dungeon_tileset_key2.json', 
//         './src/assets/dungeon_tileset'
//     )
// }

// function create() {

//     const map = this.make.tilemap({key: 'map'});
//     const tileset = map.addTilesetImage('0x72_DungeonTilesetII_v1.2', 'tiles');

//     const collisionLayer = map.createStaticLayer("testCollide", tileset, 0, 0);
//     const playerLayer = map.createStaticLayer("player", tileset, 0, 0);

//     collisionLayer.setCollisionByExclusion([-1]);

//     map.createStaticLayer('floor', tileset, 0, 0);
//     map.createStaticLayer('wall', tileset, 0, 0);

//     playerLayer.forEachTile( tile => {
//         if (tile.properties.spawn === "true") {
//             player = new Knight(this, tile.pixelX, tile.pixelY, 100);
//         }
//     })

//     player.addCollision(collisionLayer)
//     player.addAttackCollision(collisionLayer);

//     processAnimations(animations, this.anims);

//     let mosnterSprite = this.physics.add.sprite(100, 100, 'atlas', 'swampy_idle_anim_f');
//     mosnterSprite.anims.play('swampy_idle_anim_f')

//     monster = new Monster(this, mosnterSprite, 50, 50);
// }

// function update(time, delta) {
//     player.update();
//     monster.update();
// }