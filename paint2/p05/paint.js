'use strict';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let drawing = false;
let beforeX;
let beforeY;

canvas.addEventListener('mousedown', function (e) {
    if (e.button !== 0) return;

    const rect = e.target.getBoundingClientRect();
    beforeX = e.clientX - rect.left;
    beforeY = e.clientY - rect.top;

    drawing = true;
});

canvas.addEventListener('mousemove', function (e) {
    if (!drawing) return;

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(beforeX, beforeY);
    ctx.lineTo(x, y);
    ctx.stroke();

    beforeX = x;
    beforeY = y;
});

canvas.addEventListener('mouseup', function(e) {
    drawing = false;
});

document.getElementById('color').addEventListener('change', function(e) {
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
lineWidth.addEventListener('change', function(e) {
    changeLineWidth(e);
    lineWidthRange.value = e.target.value;
});

const lineWidthRange = document.getElementById('lineWidthRange');
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
