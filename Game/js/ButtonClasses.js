class Button extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, callback) {
        super(scene, x, y, texture);
        this.setOrigin(0, 0);
        this.on("pointerdown", function(pointer) {
            // if(this.enabled){
                pointer.lastBtn = this;
                this.setTint(0x00ffff);
            // }
        });
        this.setInteractive().on("pointerdown", function() {
            callback.call(this);
        })
    }
}