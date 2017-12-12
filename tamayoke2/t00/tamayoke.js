'use strict';

let canvas;
let ctx;

const FPS = 60;

let canvasWidth;
let canvasHeight;

let timer;
let robot;
let score;
let hiScore = 0;

const missiles = [];
const MISSILE_NUM = 5;
const INIT_MISSILE_SPEED = 3;
let missileSpeed;
const INCREASE_MISSILE_SPEED = 1.05;

function random(num) {
    return Math.floor(Math.random() * num);
}

function fillTextCenter(text, y) {
    let metrics = ctx.measureText(text);
    ctx.fillText(text, (CANVAS_WIDTH - metrics.width) / 2, y);
}

class Robot {
    constructor() {
        this.width = 30;
        this.height = 30;
        this.x = (canvasWidth - this.width) / 2;
        this.y = canvasHeight - this.height;
        this.pushLeft = false;
        this.pushRight = false;
        this.speed = 5;
        this.hit = false;
    }

    move() {
        if (this.pushLeft) {
            this.x = this.x - this.speed;
            if (this.x < 0) {
                this.x = 0;
            }
        }
        if (this.pushRight) {
            this.x = this.x + this.speed;
            if ((this.x + this.width) > canvasWidth) {
                this.x = canvasWidth - this.width;
            }
        }
    }

    checkHit(missile) {
        if (!((this.x > missile.x + missile.width
                || this.x + robot.width < missile.x)
                || (this.y > missile.y + missile.height
                    || this.y + robot.height < missile.y))) {
            robot.hit = true;
        }
    }
}

class Missile {
    constructor(order) {
        this.width = 5;
        this.height = 20;
        this.x = random(canvasWidth - this.width);
        this.y = -order * (this.height + 50);
    }

    move() {
        this.y = this.y + missileSpeed;
        if (this.y > canvasHeight) {
            this.x = random(canvasWidth - this.width);
            this.y = -this.height;
            score = score + 1;
            if (score % 10 === 0) {
                missileSpeed = missileSpeed * INCREASE_MISSILE_SPEED;
            }
        }
    }
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    window.addEventListener('keyup', keyup);
    window.addEventListener('keydown', keydown);

    score = 0;
    missileSpeed = INIT_MISSILE_SPEED;

    // 1000 / 60 = 16 60FPSで描画する
    timer = setInterval(mainLoop, 1000 / FPS);

    robot = new Robot();
    for (let i = 0; i < MISSILE_NUM; i++) {
        missiles[i] = new Missile(i);
    }
}

function mainLoop() {
    robot.move();

    missiles.forEach(function(missile) {
        missile.move();
        robot.checkHit(missile);
    });

    if (robot.hit) {
        if (score > hiScore) {
            hiScore = score;
        }
    }

    draw();
}

function draw() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = '#000';
    ctx.font = '10px sans-serif';
    ctx.fillText('スコア: ' + score, 5, 30);

    ctx.fillStyle = '#00f';
    ctx.fillRect(robot.x, robot.y, robot.width, robot.height);

    ctx.fillStyle = '#f00';
    missiles.forEach(function(missile) {
        ctx.fillRect(missile.x, missile.y, missile.width, missile.height);
    });

    if (robot.hit) {
        clearInterval(timer);

        ctx.fillStyle = '#000';
        ctx.font = '10px sans-serif';
        ctx.fillText('ハイスコア: ' + hiScore, 5, 50);

        ctx.font = '20px sans-serif';
        ctx.fillStyle = '#f00';
        ctx.strokeStyle = '#000';
        fillTextCenter('Game Over', 100);
        fillTextCenter('スペースキーでリスタート', 150);
    }
}

function keyup(e) {
    // 左37 右39
    switch (e.keyCode) {
        case 37:
            robot.pushLeft = false;
            break;
        case 39:
            robot.pushRight = false;
            break;
    }
}

function keydown(e) {
    // 左37 右39
    switch (e.keyCode) {
        case 32:
            if (robot.hit) {
                init();
            }
            break;
        case 37:
            robot.pushLeft = true;
            break;
        case 39:
            robot.pushRight = true;
            break;
    }
}

init();
