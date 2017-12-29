'use strict';

class Robot {
    constructor(canvasWidth, canvasHeight) {
        this._canvasWidth = canvasWidth;
        this._canvasHeight = canvasHeight;
        this._x = (this._canvasWidth - Robot.WIDTH) / 2;
        this._y = this._canvasHeight - Robot.HEIGHT;

        this._pushLeft = false;
        this._pushRight = false;
    }

    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }

    releaseLeft() {
        this._pushLeft = false;
    }

    releaseRight() {
        this._pushRight = false;
    }

    pushLeft() {
        this._pushLeft = true;
    }

    pushRight() {
        this._pushRight = true;
    }

    move() {
        if (this._pushLeft) {
            this._x = this._x - Robot.SPEED;
            if (this._x < 0) {
                this._x = 0;
            }
        } else if (this._pushRight) {
            this._x = this._x + Robot.SPEED;
            if (this._x > this._canvasWidth - Robot.WIDTH) {
                this._x = this._canvasWidth - Robot.WIDTH;
            }
        }
    }
}

Robot.WIDTH = 30;
Robot.HEIGHT = 30;
Robot.SPEED = 5;

class Missile {
    constructor() {

    }
}

class Model {
    constructor(canvasWidth, canvasHeight) {
        this._canvasWidth = canvasWidth;
        this._canvasHeight = canvasHeight;

        this._robot = new Robot(this._canvasWidth, this._canvasHeight);
    }

    getRobot() {
        return this._robot;
    }

    moveRobot() {
        this._robot.move();
    }

    releaseLeft() {
        this._robot.releaseLeft();
    }

    releaseRight() {
        this._robot.releaseRight();
    }

    pushLeft() {
        this._robot.pushLeft();
    }

    pushRight() {
        this._robot.pushRight();
    }
}

class View {
    constructor(canvasId, model) {
        this._canvas = document.getElementById(canvasId);
        this._ctx = this._canvas.getContext('2d');

        this._model = model;
    }

    update() {
        this._model.moveRobot();

        this._draw();
    }

    _draw() {
        this._clearCanvas();
        this._drawRobot();
    }

    _clearCanvas() {
        this._ctx.fillStyle = '#fff';
        this._ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    _drawRobot() {
        const robot = this._model.getRobot();
        this._ctx.fillStyle = '#00f';
        this._ctx.fillRect(robot.getX(), robot.getY(), Robot.WIDTH, Robot.HEIGHT);
    }
}

class Controller {
    constructor(canvasId, canvasWidth, canvasHeight) {
        this._model = new Model(canvasWidth, canvasHeight);
        this._view = new View(canvasId, this._model);

        window.addEventListener('keyup', e => { this._keyup(e) });
        window.addEventListener('keydown', e => { this._keydown(e) });

        const timer = setInterval(() => { this._view.update(); }, 1000 / 60);
    }

    _keyup(e) {
        // 左37 右39
        switch (e.keyCode) {
            case 37:
                this._model.releaseLeft();
                break;
            case 39:
                this._model.releaseRight();
                break;
        }
    }

    _keydown(e) {
        // 左37 右39
        switch (e.keyCode) {
            case 37:
                this._model.pushLeft();
                break;
            case 39:
                this._model.pushRight();
                break;
        }
    }
}

new Controller('canvas', 300, 400);
