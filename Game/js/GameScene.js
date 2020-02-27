class GameScene extends Phaser.Scene {
    map;
    constructor() {
        super()
    }
    preload() {
        this.load.image('tileset', 'assets/tilesheet_complete.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/level1.json');
        this.load.image('player', 'assets/player.png');
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
        }, this)
    }
    createPlayer(object) {
        this.player = this.physics.add.sprite(object.x, object.y, 'player');
        this.player.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    }
}