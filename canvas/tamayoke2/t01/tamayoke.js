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
    }
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    canvasWidth = canvas.width;
    canvasHeight = canvas.height;

    robot = new Robot();
    // 1000 / 60 = 16 60FPSで描画する
    timer = setInterval(mainLoop, 1000 / FPS);
}

function mainLoop() {
    draw();
}

function draw() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = '#00f';
    ctx.fillRect(robot.x, robot.y, robot.width, robot.height);
}

init();
