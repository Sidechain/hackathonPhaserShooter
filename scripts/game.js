const config = {
    type: Phaser.WEBGL,
    width: 568,
    height: 320,
    input: {
        gamepad: true
    },
    backgroundColor: 'black',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { x: 0, y: 0 },
        },
    },
    scene: [
        SceneMainMenu,
        SceneMain,
        SceneGameOver,
        SceneHero,
    ],
    pixelArt: true,
    roundPixels: true,
};

var score = 100;

var gamepad;

let game = new Phaser.Game(config);

/* 
Music from https://filmmusic.io:
"Stay The Course" by Kevin MacLeod (https://incompetech.com)
Licence: CC BY (http://creativecommons.org/licenses/by/4.0/)

Music from https://filmmusic.io:
"Darkness is Coming" by Kevin MacLeod (https://incompetech.com)
Licence: CC BY (http://creativecommons.org/licenses/by/4.0/)

Music from https://filmmusic.io:
"Running Fanfare" by Kevin MacLeod (https://incompetech.com)
Licence: CC BY (http://creativecommons.org/licenses/by/4.0/)

*/