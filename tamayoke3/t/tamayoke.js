'use strict';

class Robot {
    constructor(canvasWidth, canvasHeight) {
        this._canvasWidth = canvasWidth;
        this._canvasHeight = canvasHeight;
        this._x = (this._canvasWidth - Robot.WIDTH) / 2;
        this._y = this._canvasHeight - Robot.HEIGHT;

        this._pushLeft = false;
        this._pushRight = false;

        this._hit = false;
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

    checkHit(missile) {
        if (!((this._x > missile.getX() + Missile.WIDTH
                || this._x + Robot.WIDTH < missile.getX())
                || (this._y > missile.getY() + Missile.HEIGHT
                    || this._y + Robot.HEIGHT < missile.getY()))) {
            this._hit = true;
        }
    }

    isHit() {
        return this._hit;
    }

    resetHit() {
        this._hit = false;
    }
}

Robot.WIDTH = 30;
Robot.HEIGHT = 30;
Robot.SPEED = 5;

class Missile {
    constructor(canvasWidth, canvasHeight, initY) {
        this._canvasWidth = canvasWidth;
        this._canvasHeight = canvasHeight;
        this._x = this._randomX();
        this._y = initY;
    }

    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }

    move() {
        this._y = this._y + Missile.speed;
        if (this._y > this._canvasHeight) {
            this._y = -Missile.speed;

            // xも変える。
            this._x = this._randomX();

            // ミサイルがリセットされたらtrue
            return true;
        }
        // ミサイルがりせっとされていない
        return false;
    }

    _randomX() {
        return Math.floor(Math.random() * (this._canvasWidth - Missile.WIDTH));
    }
}

Missile.WIDTH = 5;
Missile.HEIGHT = 20;
Missile.INIT_SPEED = 3;
Missile.INCREASE_SPEED = 1.08;
Missile.NUM = 5;

class Model {
    constructor(canvasWidth, canvasHeight) {
        this._canvasWidth = canvasWidth;
        this._canvasHeight = canvasHeight;

        this._observers = [];
    }

    add(observer) {
        this._observers.push(observer);
    }

    _notifyAll() {
        for (const observer of this._observers) {
            observer.update();
        }
    }

    _initGame() {
        this._robot = new Robot(this._canvasWidth, this._canvasHeight);
        this._robot.resetHit();

        this._missiles = [];
        for (let i = 0; i < Missile.NUM; i++) {
            this._missiles[i] = new Missile(this._canvasWidth, this._canvasHeight, -i * (Missile.HEIGHT + 40));
        }

        this._score = 0;
        Missile.speed = Missile.INIT_SPEED;

        this._notifyAll();
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

    getMissiles() {
        return this._missiles;
    }

    getScore() {
        return this._score;
    }

    moveMissiles() {
        for (const missile of this._missiles) {
            // ミサイルが最下部まで行ったら得点を1足す
            if (missile.move()) {
                this._score = this._score + 1;
                if (this._score % 10 === 0) {
                    Missile.speed = Missile.speed * Missile.INCREASE_SPEED;
                }
            }
        }
    }

    checkHit() {
        for (const missile of this._missiles) {
            this._robot.checkHit(missile);
        }
    }

    isHit() {
        return this._robot.isHit();
    }

    start() {
        this._initGame();
    }
}

class View {
    constructor(canvasId, model) {
        this._canvas = document.getElementById(canvasId);
        this._ctx = this._canvas.getContext('2d');

        this._model = model;
    }

    update() {
        this._timer = setInterval(() => {
            this._mainLoop();
        }, 1000 / 60);
    }

    _mainLoop() {
        this._main();
        this._draw();
    }

    _main() {
        this._model.moveRobot();
        this._model.moveMissiles();

        this._model.checkHit();
    }

    _draw() {
        this._clearCanvas();
        this._drawRobot();
        this._drawMissiles();
        this._drawScore();

        if (this._model.isHit()) {
            clearInterval(this._timer);

            this._drawRestartMessage();
        }

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

    _drawMissiles() {
        for (const missile of this._model.getMissiles()) {
            this._drawMissile(missile);
        }
    }

    _drawMissile(missile) {
        this._ctx.fillStyle = '#f00';
        this._ctx.fillRect(missile.getX(), missile.getY(), Missile.WIDTH, Missile.HEIGHT);
    }

    _drawScore() {
        this._ctx.fillStyle = '#000';
        this._ctx.font = '10px sans-serif';
        this._ctx.fillText('スコア: ' + this._model.getScore(), 5, 30);
    }

    _drawRestartMessage() {
        this._ctx.font = '20px sans-serif';
        this._ctx.fillStyle = '#f00';
        this._ctx.strokeStyle = '#000';
        this._fillTextCenter('Game Over', 100);
        this._fillTextCenter('スペースキーでリスタート', 150);
    }

    _fillTextCenter(text, y) {
        const metrics = this._ctx.measureText(text);
        this._ctx.fillText(text, (this._canvas.width - metrics.width) / 2, y);
    }
}

class Controller {
    constructor(canvasId, canvasWidth, canvasHeight) {
        this._model = new Model(canvasWidth, canvasHeight);
        this._view = new View(canvasId, this._model);
        this._model.add(this._view);
        this._model.start();

        window.addEventListener('keyup', e => {
            this._keyup(e)
        });
        window.addEventListener('keydown', e => {
            this._keydown(e)
        });
    }

    _keyup(e) {
        // 左37 右39
        switch (e.keyCode) {
            case 32:
                this._model.start();
                break;
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
