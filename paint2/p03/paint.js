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
