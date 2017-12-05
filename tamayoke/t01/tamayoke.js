var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var WIDTH = canvas.width;
var HEIGHT = canvas.height;

var PLAYER_WIDTH = 30;
var PLAYER_HEIGHT = 30;

var timer;

// playerの初期位置は最下部の真ん中とする
var player = {
    x: (WIDTH - PLAYER_WIDTH) / 2,
    y: HEIGHT - PLAYER_HEIGHT
};

function init() {
    // 1000 / 60 = 16 60FPSで描画する
    timer = setInterval(mainLoop, 16);
}

function mainLoop() {
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
