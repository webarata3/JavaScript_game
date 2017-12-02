var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

document.addEventListener('mousedown', function(e) {
    if (e.target.id !== 'canvas') return;
    
    // 処理
    if (e.button === 0) {
        var rect = e.target.getBoundingClientRect();
        var canvasX = e.clientX - rect.left;
        var canvasY = e.clientY - rect.top;

        if (canvasWidth < canvasX || canvasHeight < canvasY) return;

        ctx.beginPath();
        ctx.moveTo(canvasX, canvasY);
        ctx.lineTo(canvasX + 1, canvasY + 1);
        ctx.stroke();
    }
});