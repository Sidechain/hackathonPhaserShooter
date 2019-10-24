class SceneMainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneMainMenu' });
    }

    preload() {
        this.load.image("sprBg0", "assets/sprBg0.png");
        this.load.image("sprBg1", "assets/sprBg1.png");
        this.load.image("sprBtnPlay", "assets/sprBtnPlay.png");
        this.load.image("sprBtnPlayHover", "assets/sprBtnPlayHover.png");
        this.load.image("sprBtnPlayDown", "assets/sprBtnPlayDown.png");
        this.load.image("sprBtnRestart", "assets/sprBtnRestart.png");
        this.load.image("sprBtnRestartHover", "assets/sprBtnRestartHover.png");
        this.load.image("sprBtnRestartDown", "assets/sprBtnRestartDown.png");

        this.load.audio("sndBtnOver", "assets/sndBtnOver.wav");
        this.load.audio("sndBtnDown", "assets/sndBtnDown.wav");
        this.load.audio("sndMainMenu", "assets/sndMainMenu.mp3");


    }

    create() {

        // this.input.gamepad.once('down', function(pad, button, index) {
        //     gamepad = pad;
        //     console.log('Playing with ' + pad.id);
        // }, this);

        this.sfx = {
            btnOver: this.sound.add("sndBtnOver", { volume: 0.1 }),
            btnDown: this.sound.add("sndBtnDown", { volume: 0.1 }),
            start: this.sound.add("sndMainMenu", { volume: 2.0 })
        };

        this.sfx.start.play();

        this.btnPlay = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "sprBtnPlay"
        );

        this.btnPlay.setInteractive();

        this.btnPlay.on("pointerover", function() {
            this.btnPlay.setTexture("sprBtnPlayHover");
            this.sfx.btnOver.play();
        }, this);

        this.btnPlay.on("pointerout", function() {
            this.setTexture("sprBtnPlay");
        });

        this.btnPlay.on("pointerdown", function() {
            this.btnPlay.setTexture("sprBtnPlayDown");
            this.sfx.btnDown.play();
        }, this);

        this.btnPlay.on("pointerup", function() {
            this.btnPlay.setTexture("sprBtnPlay");
            this.sfx.start.pause();
            this.scene.start("SceneMain");
        }, this);

        this.title = this.add.text(this.game.config.width * 0.5, 75, "SPACE HERO LARS", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });

        this.title.setOrigin(0.5);

        this.backgrounds = [];

        for (var i = 0; i < 5; i++) {
            var keys = ["sprBg0", "sprBg1"];
            var key = keys[Phaser.Math.Between(0, keys.length - 1)];
            var bg = new ScrollingBackground(this, key, i * 10);
            this.backgrounds.push(bg);
        }



        // var zone1 = this.add.zone(100, 295, 50, 50).setOrigin(0).setName('Up').setInteractive().on("pointerdown", function() {
        //     console.log('UP')
        // }, this);
        // var zone2 = this.add.zone(100, 405, 50, 50).setOrigin(0).setName('Down').setInteractive().on("pointerdown", function() {
        //     console.log('DOWN')
        // }, this);
        // var zone3 = this.add.zone(45, 350, 50, 50).setOrigin(0).setName('Left').setInteractive().on("pointerdown", function() {
        //     console.log('LEFT')
        // }, this);
        // var zone4 = this.add.zone(155, 350, 50, 50).setOrigin(0).setName('Right').setInteractive().on("pointerdown", function() {
        //     console.log('RIGHT')
        // }, this);
        // var zone5 = this.add.zone(525, 350, 75, 75).setOrigin(0).setName('Shoot').setInteractive().on("pointerdown", function() {
        //     console.log('SHOOT')
        // }, this);

        // var graphics = this.add.graphics();

        // graphics.lineStyle(2, 0xffff00);
        // graphics.strokeRect(100, 295, 50, 50);
        // graphics.strokeRect(100, 405, 50, 50);
        // graphics.strokeRect(45, 350, 50, 50);
        // graphics.strokeRect(155, 350, 50, 50);
        // graphics.strokeRect(525, 350, 75, 75);

    }

    update() {
        for (var i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].update();
        }

        // if (gamepad) {
        //     if (gamepad.A) {
        //         this.scene.start("SceneMain");

        //     }
        // }
    }
}

//        if (gamepad.A) {
// this.btnPlay.setTexture("sprBtnPlayDown");
// this.sfx.btnDown.play();
// this.btnPlay.setTexture("sprBtnPlay");
// this.sfx.start.pause();
// this.scene.start("SceneMain");
// }