var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var WIDTH = canvas.width;
var HEIGHT = canvas.height;

var PLAYER_WIDTH = 30;
var PLAYER_HEIGHT = 30;

var PLAYER_MOVE_AMOUNT = 5;

var timer;

// playerの初期位置は最下部の真ん中とする
var player = {
    x: (WIDTH - PLAYER_WIDTH) / 2,
    y: HEIGHT - PLAYER_HEIGHT,
    pushLeft: false,
    pushRight: false
};

function keyup(e) {
    // 左37 右39
    switch (e.keyCode) {
        case 37:
            player.pushLeft = false;
            break;
        case 39:
            player.pushRight = false;
            break;
    }
}

function keydown(e) {
    // 左37 右39
    switch (e.keyCode) {
        case 37:
            player.pushLeft = true;
            break;
        case 39:
            player.pushRight = true;
            break;
    }
}

function init() {
    // 1000 / 60 = 16 60FPSで描画する
    timer = setInterval(mainLoop, 16);

    window.addEventListener('keyup', keyup);
    window.addEventListener('keydown', keydown);
}

function mainLoop() {
    if (player.pushLeft) {
        player.x = player.x - PLAYER_MOVE_AMOUNT;
    }
    if (player.pushRight) {
        player.x = player.x + PLAYER_MOVE_AMOUNT;
    }

    draw();
}

function draw() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    // player
    ctx.fillStyle = '#f00';
    ctx.fillRect(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT);
}

init();
