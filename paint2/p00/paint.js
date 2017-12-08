'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasState = {
    drawing: false,
    beforeX: 0,
    beforeY: 0,
    x: 0,
    y: 0
};

const drawTool = {
    pen: {
        draw: function () {
            ctx.beginPath();
            ctx.moveTo(canvasState.beforeX, canvasState.beforeY);
            ctx.lineTo(canvasState.x, canvasState.y);
            ctx.stroke();
            canvasState.beforeX = canvasState.x;
            canvasState.beforeY = canvasState.y;
        }
    },
    line: {
        draw: function () {
            ctx.putImageData(imageData, 0, 0);
            ctx.beginPath();
            ctx.moveTo(canvasState.beforeX, canvasState.beforeY);
            ctx.lineTo(canvasState.x, canvasState.y);
            ctx.stroke();
        }
    },
    circle: {
        draw: function () {
            ctx.putImageData(imageData, 0, 0);
            ctx.beginPath();
            ctx.arc(canvasState.beforeX, canvasState.beforeY, Math.abs(canvasState.x - canvasState.beforeX), 0, Math.PI * 2, false);
            ctx.stroke();
        }
    },
    fillCircle: {
        draw: function () {
            ctx.putImageData(imageData, 0, 0);
            ctx.beginPath();
            ctx.arc(canvasState.beforeX, canvasState.beforeY, Math.abs(canvasState.x - canvasState.beforeX), 0, Math.PI * 2, false);
            ctx.fill();
        }
    },
    rect: {
        draw: function () {
            ctx.putImageData(imageData, 0, 0);
            ctx.strokeRect(canvasState.beforeX, canvasState.beforeY, canvasState.x - canvasState.beforeX, canvasState.y - canvasState.beforeY);
        }
    },
    fillRect: {
        draw: function () {
            ctx.putImageData(imageData, 0, 0);
            ctx.fillRect(canvasState.beforeX, canvasState.beforeY, canvasState.x - canvasState.beforeX, canvasState.y - canvasState.beforeY);
        }
    }
};

let currentDrawTool = 'pen';

let imageData;

function changeCanvasState(e) {
    const rect = e.target.getBoundingClientRect();
    canvasState.x = e.clientX - rect.left;
    canvasState.y = e.clientY - rect.top;
}

canvas.addEventListener('mousedown', function (e) {
    // 処理
    if (e.button === 0) {
        changeCanvasState(e);

        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        canvasState.beforeX = canvasState.x;
        canvasState.beforeY = canvasState.y;
        canvasState.drawing = true;
    }
});

canvas.addEventListener('mousemove', function (e) {
    // 処理
    if (!canvasState.drawing) return;

    changeCanvasState(e);

    drawTool[currentDrawTool].draw();
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

const lineWidth = document.getElementById('lineWidth');
lineWidth.addEventListener('change', function (e) {
    const num = e.target.value;
    if (!isNumber(num)) return;
    const lineWidthValue = parseInt(num, 10);
    if (lineWidthValue < 1 || lineWidthValue > 100) return;
    ctx.lineWidth = lineWidthValue;
});

const opacity = document.getElementById('opacity');
opacity.addEventListener('change', function (e) {
    const num = e.target.value;
    if (!isNumber(num)) return;
    const opacityValue = parseFloat(num);
    if (opacityValue < 0 || opacityValue > 1) return;
    ctx.globalAlpha = opacityValue;
});

const drawToolList = document.querySelectorAll('[name="drawTool"]');
for (let i = 0; i < drawToolList.length; i++) {
    drawToolList[i].addEventListener('click', function (e) {
        currentDrawTool = e.target.value;
    });
}
