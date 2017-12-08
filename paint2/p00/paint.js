'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canvasState = {
    drawing: false
};

const DRAW_TOOL_PEN = 'pen';
const DRAW_TOOL_LINE = 'line';
const DRAW_TOOL_CIRCLE = 'circle';
const DRAW_TOOL_FILL_CIRCLE = 'fillCircle';
const DRAW_TOOL_RECT = 'rect';
const DRAW_TOOL_FILL_RECT = 'fillRect';

var currentDrawTool = DRAW_TOOL_PEN;

var imageData;

function changeCanvasState(e) {
    const rect = e.target.getBoundingClientRect();
    canvasState.canvasX = e.clientX - rect.left;
    canvasState.canvasY = e.clientY - rect.top;
}

canvas.addEventListener('mousedown', function (e) {
    // 処理
    if (e.button === 0) {
        changeCanvasState(e);

        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        canvasState.beforeX = canvasState.canvasX;
        canvasState.beforeY = canvasState.canvasY;
        canvasState.drawing = true;
    }
});

canvas.addEventListener('mousemove', function (e) {
    // 処理
    if (!canvasState.drawing) return;

    changeCanvasState(e);

    if (currentDrawTool === DRAW_TOOL_LINE ||
        currentDrawTool === DRAW_TOOL_CIRCLE ||
        currentDrawTool === DRAW_TOOL_FILL_CIRCLE ||
        currentDrawTool === DRAW_TOOL_RECT ||
        currentDrawTool === DRAW_TOOL_FILL_RECT) {
        ctx.putImageData(imageData, 0, 0);
    }

    switch (currentDrawTool) {
        case DRAW_TOOL_PEN:
            ctx.beginPath();
            ctx.moveTo(canvasState.beforeX, canvasState.beforeY);
            ctx.lineTo(canvasState.canvasX, canvasState.canvasY);
            ctx.stroke();
            canvasState.beforeX = canvasState.canvasX;
            canvasState.beforeY = canvasState.canvasY;
            break;
        case DRAW_TOOL_LINE:
            ctx.beginPath();
            ctx.moveTo(canvasState.beforeX, canvasState.beforeY);
            ctx.lineTo(canvasState.canvasX, canvasState.canvasY);
            ctx.stroke();
            break;
        case DRAW_TOOL_CIRCLE:
            ctx.beginPath();
            ctx.arc(canvasState.beforeX, canvasState.beforeY, Math.abs(canvasState.canvasX - canvasState.beforeX), 0, Math.PI * 2, false);
            ctx.stroke();
            break;
        case DRAW_TOOL_FILL_CIRCLE:
            ctx.beginPath();
            ctx.arc(canvasState.beforeX, canvasState.beforeY, Math.abs(canvasState.canvasX - canvasState.beforeX), 0, Math.PI * 2, false);
            ctx.fill();
            break;
        case DRAW_TOOL_RECT:
            ctx.strokeRect(canvasState.beforeX, canvasState.beforeY, canvasState.canvasX - canvasState.beforeX, canvasState.canvasY - canvasState.beforeY);
            break;
        case DRAW_TOOL_FILL_RECT:
            ctx.fillRect(canvasState.beforeX, canvasState.beforeY, canvasState.canvasX - canvasState.beforeX, canvasState.canvasY - canvasState.beforeY);
            break;
    }
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
    var num = e.target.value;
    if (!isNumber(num)) return;
    var lineWidthValue = parseInt(num, 10);
    if (lineWidthValue < 1 || lineWidthValue > 100) return;
    ctx.lineWidth = lineWidthValue;
});

const opacity = document.getElementById('opacity');
opacity.addEventListener('change', function (e) {
    var num = e.target.value;
    if (!isNumber(num)) return;
    var opacityValue = parseFloat(num);
    if (opacityValue < 0 || opacityValue > 1) return;
    ctx.globalAlpha = opacityValue;
});

const drawToolList = document.querySelectorAll('[name="drawTool"]');
for (var i = 0; i < drawToolList.length; i++) {
    drawToolList[i].addEventListener('click', function (e) {
        currentDrawTool = e.target.value;
    });
}
