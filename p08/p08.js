var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var drawing = false;
var beforeX;
var beforeY;

function getCanvasInfo(e) {
    var canvasInfo = {};

    var rect = e.target.getBoundingClientRect();
    canvasInfo.canvasX = e.clientX - rect.left;
    canvasInfo.canvasY = e.clientY - rect.top;

    canvasInfo.inCanvas = canvasWidth >= canvasInfo.canvasX || canvasHeight >= canvasInfo.canvasY;

    return canvasInfo;
}

document.addEventListener('mousedown', function(e) {
    if (e.target.id !== 'canvas') return;

    // 処理
    if (e.button === 0) {
        var canvasInfo = getCanvasInfo(e);
        if (!canvasInfo.inCanvas) return;

        beforeX = canvasInfo.canvasX;
        beforeY = canvasInfo.canvasY;
        drawing = true;
    }
});

document.addEventListener('mousemove', function(e) {
    // 処理
    if (e.button === 0) {
        if (!drawing) return;

        var canvasInfo = getCanvasInfo(e);
        if (!canvasInfo.inCanvas) return;

        ctx.beginPath();
        ctx.moveTo(beforeX, beforeY);
        ctx.lineTo(canvasInfo.canvasX, canvasInfo.canvasY);
        ctx.stroke();
        beforeX = canvasInfo.canvasX;
        beforeY = canvasInfo.canvasY;
    }
});

document.addEventListener('mouseup', function(e) {
    drawing = false;
});

var colorList = document.querySelectorAll('[name="color"]');
for (var i = 0; i < colorList.length; i++) {
    colorList[i].addEventListener('click', function(e) {
        var color = e.target.value;
        switch (color) {
            case 'black':
                ctx.strokeStyle = '#000';
                break;
            case 'red':
                ctx.strokeStyle = '#f00';
                break;
            case 'green':
                ctx.strokeStyle = '#0f0';
                break;
            case 'blue':
                ctx.strokeStyle = '#00f';
                break;
        }
    });
}

// 数値であるかチェック
function isNumber(val) {
    if (val == null || val.trim() === '') {
        return false;
    }
    return !isNaN(val);
}

var lineWidth = document.getElementById('lineWidth');
lineWidth.addEventListener('change', function(e) {
    var num = e.target.value;
    if (!isNumber(num)) return;
    var lineWidthValue = parseInt(num);
    if (lineWidthValue < 1 || lineWidthValue > 100) return;
    ctx.lineWidth = lineWidthValue;
});

var opacity = document.getElementById('opacity');
opacity.addEventListener('change', function(e) {
    var num = e.target.value;
    if (!isNumber(num)) return;
    var opacityValue = parseFloat(num);
    if (opacityValue < 0 || opacityValue > 1) return;
    ctx.globalAlpha = opacityValue;
});
