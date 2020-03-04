class GameScene extends Phaser.Scene {
    map;
    maxSpeed = 100;
    currentSpeed;
    constructor() {
        super()
    }
    preload() {
        this.load.image('tileset', 'assets/tilesheet_complete.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/level1.json');
        this.load.image('player', 'assets/player.png');
        this.load.image('up-button', 'assets/up.png');
        this.load.image('down-button', 'assets/down.png');
        this.load.image('left-button', 'assets/left.png');
        this.load.image('right-button', 'assets/right.png');
    }
    create() {
        this.map = this.make.tilemap({
            key: 'tilemap'
        });
        let landscape = this.map.addTilesetImage('tilesheet_complete', 'tileset');
        this.map.createStaticLayer('layer1', landscape);
        this.map.createStaticLayer('layer2', landscape);
        this.map.createStaticLayer('layer3', landscape);
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.map.getObjectLayer("objects").objects.forEach(function (object) {
            if (object.type === "playerSpawn") {
                this.createPlayer(object);
            }
        }, this);
        new Button(this, 20, 20, "up-button", function() {
            
        });
    }
    createPlayer(object) {
        this.player = this.physics.add.sprite(object.x, object.y, 'player');
        this.player.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    }
}
// class UIScene extends Phaser.Scene {
//     constructor() {
//         super('UIScene')
//     }
//     preload() {
//         this.load.image('up-button', 'assets/up.png');
//         this.load.image('down-button', 'assets/down.png');
//         this.load.image('left-button', 'assets/left.png');
//         this.load.image('right-button', 'assets/right.png');
//     }
//     createUIScene() {
//         new Button(this, 10, 10, "up-button", function() {
//             this.player.setVelocityY(-50)
//         })
//     }
// }