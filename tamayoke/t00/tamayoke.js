'use strict';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var FPS = 60;

var WIDTH = canvas.width;
var HEIGHT = canvas.height;

var PLAYER_WIDTH = 30;
var PLAYER_HEIGHT = 30;

var PLAYER_MOVE_SPEED = 5;

var MISSILE_WIDTH = 5;
var MISSILE_HEIGHT = 20;
var INIT_MISSILE_SPEED = 4;
var missileSpeed;
var MISSILE_NUM = 5;
var MISSILE_INTERVAL = 70;
var INCREASE_MISSILE_SPEED = 1.05;

var missile = [];

var score;
var hiScore = 0;
var hit;

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
        case 32:
            if (hit) {
                init();
            }
            break;
        case 37:
            player.pushLeft = true;
            break;
        case 39:
            player.pushRight = true;
            break;
    }
}

function random(num) {
    return Math.floor(Math.random() * num);
}

function init() {
    hit = false;
    score = 0;

    // 1000 / 60 = 16 60FPSで描画する
    timer = setInterval(mainLoop, 1000 / FPS);

    missileSpeed = INIT_MISSILE_SPEED;

    for (var i = 0; i < MISSILE_NUM; i++) {
        missile[i] = {
            x: random(WIDTH - MISSILE_WIDTH),
            y: -missileSpeed - MISSILE_INTERVAL * i
        };
    }
}

function mainLoop() {
    // player
    if (player.pushLeft) {
        player.x = player.x - PLAYER_MOVE_SPEED;
        if (player.x < 0) {
            player.x = 0;
        }
    }
    if (player.pushRight) {
        player.x = player.x + PLAYER_MOVE_SPEED;
        if (player.x > WIDTH - PLAYER_WIDTH) {
            player.x = WIDTH - PLAYER_WIDTH;
        }
    }

    var i;

    // missile
    for (i = 0; i < MISSILE_NUM; i++) {
        missile[i].y = missile[i].y + missileSpeed;
        if (missile[i].y > HEIGHT) {
            missile[i].x = random(WIDTH - MISSILE_WIDTH);
            missile[i].y = -missileSpeed;
            score = score + 1;
            if (score % 10 === 0) {
                missileSpeed = missileSpeed * INCREASE_MISSILE_SPEED;
            }
        }
    }

    // 当たり判定
    for (i = 0; i < MISSILE_NUM; i++) {
        if (!((player.x > missile[i].x + MISSILE_WIDTH
                || player.x + PLAYER_WIDTH < missile[i].x)
                || (player.y > missile[i].y + MISSILE_HEIGHT
                    || player.y + PLAYER_HEIGHT < missile[i].y))) {
            hit = true;
            if (score > hiScore) {
                hiScore = score;
            }

            break;
        }
    }

    draw();
}

function draw() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = '#000';
    ctx.font = '10px sans-serif';
    ctx.fillText('スコア: ' + score, 5, 30);

    // player
    ctx.fillStyle = '#00f';
    ctx.fillRect(player.x, player.y, PLAYER_WIDTH, PLAYER_HEIGHT);

    // missile
    ctx.fillStyle = '#f00';
    for (var i = 0; i < MISSILE_NUM; i++) {
        ctx.fillRect(missile[i].x, missile[i].y, MISSILE_WIDTH, MISSILE_HEIGHT);
    }

    if (hit) {
        clearInterval(timer);

        ctx.fillStyle = '#000';
        ctx.font = '10px sans-serif';
        ctx.fillText('ハイスコア: ' + hiScore, 5, 50);

        ctx.font = '20px sans-serif';
        ctx.fillStyle = '#f00';
        ctx.strokeStyle = '#000';
        var metrics = ctx.measureText('Game Over');
        ctx.fillText('Game Over', (WIDTH - metrics.width) / 2, 100);
        metrics = ctx.measureText('スペースキーでリスタート');
        ctx.fillText('スペースキーでリスタート', (WIDTH - metrics.width) / 2, 150);
    }
}

window.addEventListener('keyup', keyup);
window.addEventListener('keydown', keydown);

init();
