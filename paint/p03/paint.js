var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var beforeX;
var beforeY;
var drawing = false;

canvas.addEventListener('mousedown', function (e) {
    // 処理
    if (e.button === 0) {
        var rect = e.target.getBoundingClientRect();
        var canvasX = e.clientX - rect.left;
        var canvasY = e.clientY - rect.top;

        beforeX = canvasX;
        beforeY = canvasY;

        drawing = true;
    }
});

canvas.addEventListener('mousemove', function (e) {
    // 処理
    if (e.button === 0) {
        if (!drawing) return;

        var rect = e.target.getBoundingClientRect();
        var canvasX = e.clientX - rect.left;
        var canvasY = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(beforeX, beforeY);
        ctx.lineTo(canvasX, canvasY);
        ctx.stroke();

        beforeX = canvasX;
        beforeY = canvasY;
    }
});

canvas.addEventListener('mouseup', function (e) {
    drawing = false;
});
