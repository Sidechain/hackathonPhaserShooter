class SceneHero extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneHero' });
    }
    preload() {
        this.load.image("sprBg0", "assets/sprBg0.png");
        this.load.image("sprBg1", "assets/sprBg1.png");
        this.load.image("sprbtnRestart", "assets/sprbtnRestart.png");
        this.load.image("sprbtnRestartHover", "assets/sprbtnRestartHover.png");
        this.load.image("sprbtnRestartDown", "assets/sprbtnRestartDown.png");
        this.load.image("sprBtnRestart", "assets/sprBtnRestart.png");
        this.load.image("sprBtnRestartHover", "assets/sprBtnRestartHover.png");
        this.load.image("sprBtnRestartDown", "assets/sprBtnRestartDown.png");

        this.load.audio("sndBtnOver", "assets/sndBtnOver.wav");
        this.load.audio("sndBtnDown", "assets/sndBtnDown.wav");
        this.load.audio("sndVictory", "assets/sndVictory.mp3");
    }

    create() {
        this.sfx = {
            btnOver: this.sound.add("sndBtnOver"),
            btnDown: this.sound.add("sndBtnDown"),
            victory: this.sound.add("sndVictory")
        };

        this.sfx.victory.play();

        this.btnRestart = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "sprbtnRestart"
        );

        this.btnRestart.setInteractive();

        this.btnRestart.on("pointerover", function() {
            this.btnRestart.setTexture("sprbtnRestartHover");
            this.sfx.btnOver.play();
        }, this);

        this.btnRestart.on("pointerout", function() {
            this.setTexture("sprbtnRestart");
        });

        this.btnRestart.on("pointerdown", function() {
            this.btnRestart.setTexture("sprbtnRestartDown");
            this.sfx.btnDown.play();
        }, this);

        this.btnRestart.on("pointerup", function() {
            this.btnRestart.setTexture("sprbtnRestart");
            this.sfx.victory.pause();
            this.scene.start("SceneMain");
        }, this);

        this.title = this.add.text(this.game.config.width * 0.5, 75, "LARS IS NOT THE HERO WE DESERVE", {
            fontFamily: 'monospace',
            fontSize: 24,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });

        this.title2 = this.add.text(this.game.config.width * 0.5, 250, "BUT THE HERO WE NEED", {
            fontFamily: 'monospace',
            fontSize: 32,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });

        this.title.setOrigin(0.5);
        this.title2.setOrigin(0.5);


        this.backgrounds = [];

        for (var i = 0; i < 5; i++) {
            var keys = ["sprBg0", "sprBg1"];
            var key = keys[Phaser.Math.Between(0, keys.length - 1)];
            var bg = new ScrollingBackground(this, key, i * 10);
            this.backgrounds.push(bg);
        }
    }

    update() {
        for (var i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].update();
        }
    }
}