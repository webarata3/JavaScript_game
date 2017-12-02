var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var beforeX;
var beforeY;
var drawing = false;

document.addEventListener('mousedown', function (e) {
    if (e.target.id !== 'canvas') return;

    // 処理
    if (e.button === 0) {
        var rect = e.target.getBoundingClientRect();
        var canvasX = e.clientX - rect.left;
        var canvasY = e.clientY - rect.top;

        if (canvasWidth < canvasX || canvasHeight < canvasY) return;

        beforeX = canvasX;
        beforeY = canvasY;

        drawing = true;
    }
});

document.addEventListener('mousemove', function (e) {
    // 処理
    if (e.button === 0) {
        if (!drawing) return;

        var rect = e.target.getBoundingClientRect();
        var canvasX = e.clientX - rect.left;
        var canvasY = e.clientY - rect.top;

        if (canvasWidth < canvasX || canvasHeight < canvasY) return;

        ctx.beginPath();
        ctx.moveTo(beforeX, beforeY);
        ctx.lineTo(canvasX, canvasY);
        ctx.stroke();

        beforeX = canvasX;
        beforeY = canvasY;
    }
});

document.addEventListener('mouseup', function (e) {
    drawing = false;
});
