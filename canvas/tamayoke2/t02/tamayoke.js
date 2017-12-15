'use strict';

let canvas;
let ctx;

const FPS = 60;

let canvasWidth;
let canvasHeight;

let timer;
let robot;

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
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    robot = new Robot();

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

    draw();
}

function draw() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = '#00f';
    ctx.fillRect(robot.x, robot.y, robot.width, robot.height);
}

init();
