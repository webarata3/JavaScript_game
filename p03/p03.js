var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var isClick = false;

document.addEventListener('mousedown', function (e) {
    // 処理
    if (e.button === 0) {
        var rect = e.target.getBoundingClientRect();
        var canvasX = e.clientX - rect.left;
        var canvasY = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(canvasX, canvasY);
        isClick = true;
    }
});

document.addEventListener('mousemove', function (e) {
    // 処理
    if (e.button === 0) {
        if (!isClick) return;

        var rect = e.target.getBoundingClientRect();
        var canvasX = e.clientX - rect.left;
        var canvasY = e.clientY - rect.top;

        ctx.lineTo(canvasX + 1, canvasY + 1);
        ctx.stroke();
    }
});

document.addEventListener('mouseup', function (e) {
    isClick = false;
});
