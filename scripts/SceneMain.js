class SceneMain extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneMain' });
    }

    preload() {

        this.load.image("sprBg0", "assets/sprBg0.png");
        this.load.image("sprBg1", "assets/sprBg1.png");

        this.load.spritesheet("sprExplosion", "assets/sprExplosion.png", {
            frameWidth: 32,
            frameHeight: 32
        });

        this.load.spritesheet("sprEnemy0", "assets/sprEnemy0.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.image("sprEnemy1", "assets/sprEnemy1.png");

        this.load.spritesheet("sprEnemy2", "assets/sprEnemy2.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.image("sprLaserEnemy0", "assets/sprLaserEnemy0.png");
        this.load.image("sprLaserPlayer", "assets/sprLaserPlayer.png");
        this.load.spritesheet("sprPlayer", "assets/sprPlayer.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.audio("sndExplode0", "assets/sndExplode0.wav");
        this.load.audio("sndExplode1", "assets/sndExplode1.wav");
        this.load.audio("sndLaser", "assets/sndLaser.wav");
        this.load.audio("sndMain", "assets/sndMain.mp3");
    }

    create() {
        score = 0;
        this.sfx = {
            explosions: [
                this.sound.add("sndExplode0", { volume: 0.3 }),
                this.sound.add("sndExplode1", { volume: 0.3 })
            ],
            laser: this.sound.add("sndLaser", { volume: 0.3 }),
            main: this.sound.add("sndMain", { volume: 0.3 })
        };

        this.sfx.main.play();

        // this.input.gamepad.once('down', function(pad, button, index) {
        //     gamepad = pad;
        //     console.log('Playing with ' + pad.id);
        // }, this);



        // var zone1 = this.add.zone(100, 295, 50, 50).setOrigin(0).setName('Up').setInteractive().on("pointerdown", function() {
        //     this.player.moveUp();
        // }, this);

        // var zone2 = this.add.zone(100, 405, 50, 50).setOrigin(0).setName('Down').setInteractive().on("pointerdown", function() {
        //     this.player.moveDown();
        // }, this);
        // var zone3 = this.add.zone(45, 350, 50, 50).setOrigin(0).setName('Left').setInteractive().on("pointerdown", function() {
        //     this.player.moveLeft();
        // }, this);
        // var zone4 = this.add.zone(155, 350, 50, 50).setOrigin(0).setName('Right').setInteractive().on("pointerdown", function() {
        //     this.player.moveRight();
        // }, this);
        // var zone5 = this.add.zone(525, 350, 75, 75).setOrigin(0).setName('Shoot').setInteractive().on("pointerdown", function() {
        //     this.player.setData("isShooting", true);
        // }, this);

        // var graphics = this.add.graphics();

        // graphics.lineStyle(2, 0xffff00);
        // graphics.strokeRect(100, 295, 50, 50);
        // graphics.strokeRect(100, 405, 50, 50);
        // graphics.strokeRect(45, 350, 50, 50);
        // graphics.strokeRect(155, 350, 50, 50);
        // graphics.strokeRect(525, 350, 75, 75);



        this.anims.create({
            key: "sprEnemy0",
            frames: this.anims.generateFrameNumbers("sprEnemy0"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "sprEnemy2",
            frames: this.anims.generateFrameNumbers("sprEnemy2"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "sprExplosion",
            frames: this.anims.generateFrameNumbers("sprExplosion"),
            frameRate: 20,
            repeat: 0
        });

        this.anims.create({
            key: "sprPlayer",
            frames: this.anims.generateFrameNumbers("sprPlayer"),
            frameRate: 20,
            repeat: -1
        });

        this.backgrounds = [];
        for (var i = 0; i < 5; i++) { // Amount of layers in scrolling bg
            var bg = new ScrollingBackground(this, "sprBg0", i * 10);
            this.backgrounds.push(bg);
        }

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "sprPlayer"
        );

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        this.playerLasers = this.add.group();

        this.time.addEvent({
            delay: 750, //change value to spawn more/less ships
            callback: function() {
                var enemy = null;
                if (Phaser.Math.Between(0, 10) >= 3) {
                    enemy = new GunShip(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    );
                } else if (Phaser.Math.Between(0, 10) >= 5) {
                    if (this.getEnemiesByType("ChaserShip").length < 5) {

                        enemy = new ChaserShip(
                            this,
                            Phaser.Math.Between(0, this.game.config.width),
                            0
                        );
                    }
                } else {
                    enemy = new CarrierShip(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    );
                }

                if (enemy !== null) {
                    enemy.setScale(2.0);
                    this.enemies.add(enemy);
                }
            },
            callbackScope: this,
            loop: true
        });

        this.physics.add.collider(this.playerLasers, this.enemies, function(playerLaser, enemy) {
            if (enemy) {
                if (enemy.onDestroy !== undefined) {
                    enemy.onDestroy();
                }
                enemy.explode(true);
                playerLaser.destroy();
            }

        });

        this.physics.add.overlap(this.player, this.enemies, function(player, enemy) {
            if (!player.getData("isDead") &&
                !enemy.getData("isDead")) {
                player.explode(false);
                player.onDestroy();
                enemy.explode(true);

            }
        });

        this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser) {
            if (!player.getData("isDead") &&
                !laser.getData("isDead")) {
                player.explode(false);
                player.onDestroy();
                laser.destroy();
            }
        });

        this.scoreText = this.add.text(30, 10, "", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });

        this.scoreText.setOrigin(0.1);

    }

    update() {
        this.scoreText.setText('Score:' + score);

        if (this.player.getData("isDead")) {
            this.sfx.main.pause();
        }

        if (score > 19) {
            this.sfx.main.pause();
            this.player.onWin()
        }

        if (!this.player.getData("isDead")) {
            this.player.update();

            if (gamepad) {
                if (gamepad.left) {
                    this.player.moveLeft();
                } else if (gamepad.right) {
                    this.player.moveRight();
                } else {

                }

                if (gamepad.up) {
                    this.player.moveUp();
                } else if (gamepad.down) {
                    this.player.moveDown();
                } else {

                }

                // if (gamepad.A) {
                //     console.log('PAAAAANG PAAANG PANG!!!!')
                //     this.player.setData("isShooting", true);
                // } else {
                //     this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
                //     this.player.setData("isShooting", false);
                // }
            }

            if (this.keyW.isDown && this.keyS.isDown) {

            } else if (this.keyW.isDown) {
                this.player.moveUp();
            } else if (this.keyS.isDown) {
                this.player.moveDown();
            }

            if (this.keyA.isDown && this.keyD.isDown) {

            } else if (this.keyA.isDown) {
                this.player.moveLeft();
            } else if (this.keyD.isDown) {
                this.player.moveRight();
            }

            if (this.keySpace.isDown) {
                this.player.setData("isShooting", true);
            } else {
                this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
                this.player.setData("isShooting", false);
            }
        }

        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
            enemy.update();

            if (enemy.x < -enemy.displayWidth ||
                enemy.x > this.game.config.width + enemy.displayWidth ||
                enemy.y < -enemy.displayHeight * 4 ||
                enemy.y > this.game.config.height + enemy.displayHeight) {

                if (enemy) {
                    if (enemy.onDestroy !== undefined) {
                        enemy.onDestroy();
                    }
                    enemy.destroy();
                    console.log('An enemy was destroyed!');
                }

            }
        }

        for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
            var laser = this.enemyLasers.getChildren()[i];
            laser.update();

            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                    console.log('A laser was destroyed!');
                }
            }
        }

        for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
            var laser = this.playerLasers.getChildren()[i];
            laser.update();
            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                    console.log('A player laser was destroyed!');
                }
            }
        }

        for (var i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].update();
        }
    }

    getEnemiesByType(type) {
        var arr = [];
        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
            if (enemy.getData("type") == type) {
                arr.push(enemy);
            }
        }
        return arr;
    }
}