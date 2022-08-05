import Knight from './player-characters/knight.js';
import Monster from './nonplayer-characters/monster.js';
import TILES from './utility/tilemapping.js';
import SwampThing from './nonplayer-characters/swampthing.js';

function randBetween(min, max) {
    return Math.random() * (max - min) + min
}

let swampThings = [];

export default class DungeonLevel extends Phaser.Scene {
    preload() {
        this.load.image('tiles', './src/assets/DungeonTileSet.png');

        this.load.image('tiles', './src/assets/dungeon_tileset/0x72_DungeonTilesetII_v1.2.png');
        this.load.tilemapTiledJSON('map', './src/assets/levels/level_one/level1.json');

        this.load.atlas(
            'fireball',
            './src/assets/fireball/fireball_spritesheet.png',
            './src/assets/fireball/fireball_sprite_key.json'
        )

        this.load.multiatlas(
            'atlas',
            './src/assets/dungeon_tileset/dungeon_tileset_key2.json',
            './src/assets/dungeon_tileset'
        )
    }

    create() {
        const cam = this.cameras.main;
        this.dungeon = new Dungeon({
            width: 50,
            height: 50,
            doorPadding: 2,
            rooms: {
                width: {
                    min: 7,
                    max: 15,
                    onlyOdd: true
                },
                height: {
                    min: 7,
                    max: 15,
                    onlyOdd: true
                }
            }
        });

        // Create a blank tilemap with dimensions matching the dungeon
        const map = this.make.tilemap({
            tileWidth: 48,
            tileHeight: 48,
            width: this.dungeon.width,
            height: this.dungeon.height
        });


        const tileset = map.addTilesetImage("tiles", null, 48, 48, 1, 2); // 1px margin, 2px spacing
        this.groundLayer = map.createBlankDynamicLayer('Ground', tileset);
        this.stuffLayer = map.createBlankDynamicLayer('Stuff', tileset);

        this.groundLayer.fill(TILES.BLANK);
        this.stuffLayer.fill(TILES.BLANK);

        const rooms = this.dungeon.rooms.slice();
        const startRoom = rooms.shift();
        const endRoom = Phaser.Utils.Array.RemoveRandomElement(rooms);
        const otherRooms = Phaser.Utils.Array.Shuffle(rooms).slice(0, rooms.length * 0.9);

        // Put boss monster here
        // this.stuffLayer.putTileAt(TILES.STAIRS, endRoom.centerX, endRoom.centerY);
        
        rooms.forEach( room => {
            const {
                top, 
                left, 
                bottom, 
                right
            } = room;

            let rand = Math.random();

            if(rand <= .25) {
                for (let i = 0; i < 5; i++) {
                    let mx = randBetween(
                        map.tileToWorldX(left) + 148,
                        map.tileToWorldX(right) - 116
                    )
        
                    let my = randBetween(
                        map.tileToWorldY(top) + 148,
                        map.tileToWorldY(bottom) - 116
                    )

                    let dx = Math.random();
                    let dy = Math.random();

                    swampThings.push(new SwampThing(this, mx, my, 100, {x: dx, y: dy}, 50));
                }
            } else {
                for (let i = 0; i < 3; i++) {
                    let mx = randBetween(
                        map.tileToWorldX(left) + 148,
                        map.tileToWorldX(right) - 116
                    )
        
                    let my = randBetween(
                        map.tileToWorldY(top) + 148,
                        map.tileToWorldY(bottom) - 116
                    )

                    let dx = Math.random();
                    let dy = Math.random();

                    swampThings.push(new SwampThing(this, mx, my, 100, {x: dx, y: dy}, 50));
                }
            }
        })

        this.dungeon.rooms.forEach(room => {
            const {
                x,
                y,
                width,
                height,
                left,
                right,
                top,
                bottom
            } = room;

            this.groundLayer.weightedRandomize(x + 1, y + 1, width - 2, height - 2, TILES.FLOOR);

            this.groundLayer.putTileAt(TILES.WALL.TOP_LEFT, left, top);
            this.groundLayer.putTileAt(TILES.WALL.TOP_RIGHT, right, top);
            this.groundLayer.putTileAt(TILES.WALL.BOTTOM_RIGHT, right, bottom);
            this.groundLayer.putTileAt(TILES.WALL.BOTTOM_LEFT, left, bottom);

            this.groundLayer.weightedRandomize(left + 1, top, width - 2, 1, TILES.WALL.TOP);
            this.groundLayer.weightedRandomize(left + 1, bottom, width - 2, 1, TILES.WALL.BOTTOM);
            this.groundLayer.weightedRandomize(left, top + 1, 1, height - 2, TILES.WALL.LEFT);
            this.groundLayer.weightedRandomize(right, top + 1, 1, height - 2, TILES.WALL.RIGHT);

            var doors = room.getDoorLocations(); // → Returns an array of {x, y} objects
            for (var i = 0; i < doors.length; i++) {
                if (doors[i].y === 0) {
                    this.groundLayer.putTilesAt(TILES.DOOR.TOP, x + doors[i].x - 1, y + doors[i].y);
                } else if (doors[i].y === room.height - 1) {
                    this.groundLayer.putTilesAt(TILES.DOOR.BOTTOM, x + doors[i].x - 1, y + doors[i].y);
                } else if (doors[i].x === 0) {
                    this.groundLayer.putTilesAt(TILES.DOOR.LEFT, x + doors[i].x, y + doors[i].y - 1);
                } else if (doors[i].x === room.width - 1) {
                    this.groundLayer.putTilesAt(TILES.DOOR.RIGHT, x + doors[i].x, y + doors[i].y - 1);
                }
            }
        })

        this.groundLayer.setCollisionByExclusion([-1, 6, 7, 8, 26]);

        this.knight = new Knight(this, map.widthInPixels / 2, map.heightInPixels / 2, 200);
        this.knight.addCollision(this.groundLayer);
        this.knight.addAttackCollision(this.groundLayer);

        swampThings.forEach( swampy => {
            this.knight.addAttackOverlap(swampy.sprite, () => {
                swampy.decreaseHP(1)
            })
        })

        cam.startFollow(this.knight.sprite);
        cam.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    }

    update() {
        this.knight.update()
        swampThings.forEach( st => {st.update()})
    }
}