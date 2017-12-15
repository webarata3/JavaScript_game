'use strict';

let canvas;
let ctx;

const FPS = 60;

let canvasWidth;
let canvasHeight;

let timer;
let robot;
let score;

let missiles = [];
const MISSILE_NUM = 5;
let missileSpeed = 3;

function random(num) {
    return Math.floor(Math.random() * num);
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
                || this.x + this.width < missile.x)
                || (this.y > missile.y + missile.height
                    || this.y + this.height < missile.y))) {
            this.hit = true;
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
        }
    }
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    score = 0;

    robot = new Robot();

    for (let i = 0; i < MISSILE_NUM; i++) {
        missiles[i] = new Missile(i);
    }

    registerEvent();

    // 1000 / 60 = 16 60FPSで描画する
    timer = setInterval(mainLoop, 1000 / FPS);
}

function registerEvent() {
    window.addEventListener('keyup', function(e) {
        // 左37 右39
        switch (e.keyCode) {
            case 37:
                robot.pushLeft = false;
                break;
            case 39:
                robot.pushRight = false;
                break;
        }
    });

    window.addEventListener('keydown', function(e) {
        // 左37 右39
        switch (e.keyCode) {
            case 37:
                robot.pushLeft = true;
                break;
            case 39:
                robot.pushRight = true;
                break;
        }
    });
}

function mainLoop() {
    robot.move();

    missiles.forEach(function(missile) {
        missile.move();
        robot.checkHit(missile);
    });


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
    }
}

init();
