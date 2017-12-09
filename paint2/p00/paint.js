'use strict';

class CanvasState {
    constructor() {
        this.currentDrawTool = 'pen';
        this.imageData = null;
        this.drawing = false;
        this.beforeX = 0;
        this.beforeY = 0;
        this.x = 0;
        this.y = 0;
    }

    setPos(e) {
        const rect = e.target.getBoundingClientRect();
        this.x = e.clientX - rect.left;
        this.y = e.clientY - rect.top;
    }

    movePos() {
        this.beforeX = this.x;
        this.beforeY = this.y;
    }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasState = new CanvasState();

const drawTool = {
    pen: {
        draw: function () {
            ctx.beginPath();
            ctx.moveTo(canvasState.beforeX, canvasState.beforeY);
            ctx.lineTo(canvasState.x, canvasState.y);
            ctx.stroke();
            canvasState.movePos();
        }
    },
    line: {
        draw: function () {
            ctx.putImageData(canvasState.imageData, 0, 0);
            ctx.beginPath();
            ctx.moveTo(canvasState.beforeX, canvasState.beforeY);
            ctx.lineTo(canvasState.x, canvasState.y);
            ctx.stroke();
        }
    },
    circle: {
        draw: function () {
            ctx.putImageData(canvasState.imageData, 0, 0);
            ctx.beginPath();
            ctx.arc(canvasState.beforeX, canvasState.beforeY, Math.abs(canvasState.x - canvasState.beforeX), 0, Math.PI * 2, false);
            ctx.stroke();
        }
    },
    fillCircle: {
        draw: function () {
            ctx.putImageData(canvasState.imageData, 0, 0);
            ctx.beginPath();
            ctx.arc(canvasState.beforeX, canvasState.beforeY, Math.abs(canvasState.x - canvasState.beforeX), 0, Math.PI * 2, false);
            ctx.fill();
        }
    },
    rect: {
        draw: function () {
            ctx.putImageData(canvasState.imageData, 0, 0);
            ctx.strokeRect(canvasState.beforeX, canvasState.beforeY, canvasState.x - canvasState.beforeX, canvasState.y - canvasState.beforeY);
        }
    },
    fillRect: {
        draw: function () {
            ctx.putImageData(canvasState.imageData, 0, 0);
            ctx.fillRect(canvasState.beforeX, canvasState.beforeY, canvasState.x - canvasState.beforeX, canvasState.y - canvasState.beforeY);
        }
    }
};

canvas.addEventListener('mousedown', function (e) {
    // 処理
    if (e.button === 0) {
        canvasState.setPos(e);

        canvasState.imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        canvasState.beforeX = canvasState.x;
        canvasState.beforeY = canvasState.y;
        canvasState.drawing = true;
    }
});

canvas.addEventListener('mousemove', function (e) {
    // 処理
    if (!canvasState.drawing) return;

    canvasState.setPos(e);

    drawTool[canvasState.currentDrawTool].draw();
});

canvas.addEventListener('mouseup', function (e) {
    canvasState.drawing = false;
});

const color = document.getElementById('color');
color.addEventListener('change', function (e) {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
});

// 数値であるかチェック
function isNumber(val) {
    if (val == null || val.trim() === '') {
        return false;
    }
    return !isNaN(val);
}

function changeLineWidth(e) {
    const num = e.target.value;
    if (!isNumber(num)) return;
    const lineWidthValue = parseInt(num, 10);
    if (lineWidthValue < 1 || lineWidthValue > 100) return;
    ctx.lineWidth = lineWidthValue;
}

const lineWidth = document.getElementById('lineWidth');
lineWidth.addEventListener('change', function (e) {
    changeLineWidth(e);
    lineWidthRange.value = e.target.value;
});

const lineWidthRange = document.getElementById('lineWidthRange')
lineWidthRange.addEventListener('change', function(e) {
    changeLineWidth(e);
    lineWidth.value = e.target.value;
});

function changeOpacity(e) {
    const num = e.target.value;
    if (!isNumber(num)) return;
    const opacityValue = parseFloat(num);
    if (opacityValue < 0 || opacityValue > 1) return;
    ctx.globalAlpha = opacityValue;
}

const opacity = document.getElementById('opacity');
opacity.addEventListener('change', function (e) {
    changeOpacity(e);
    opacityRange.value = e.target.value;
});

const opacityRange = document.getElementById('opacityRange');
opacityRange.addEventListener('change', function (e) {
    changeOpacity(e);
    opacity.value = e.target.value;
});

const drawToolList = document.querySelectorAll('[name="drawTool"]');
for (let i = 0; i < drawToolList.length; i++) {
    drawToolList[i].addEventListener('click', function (e) {
        canvasState.currentDrawTool = e.target.value;
    });
}
