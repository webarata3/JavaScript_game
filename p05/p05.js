var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var isClick = false;

function getCanvasInfo(e) {
    var canvasInfo = {};

    var rect = e.target.getBoundingClientRect();
    canvasInfo.canvasX = e.clientX - rect.left;
    canvasInfo.canvasY = e.clientY - rect.top;

    canvasInfo.inCanvas = canvasWidth >= canvasInfo.canvasX || canvasHeight >= canvasInfo.canvasY;

    return canvasInfo;
}

document.addEventListener('mousedown', function (e) {
    if (e.target.id !== 'canvas') return;

    // 処理
    if (e.button === 0) {
        var canvasInfo = getCanvasInfo(e);
        if (!canvasInfo.inCanvas) return;

        ctx.beginPath();
        ctx.moveTo(canvasInfo.canvasX, canvasInfo.canvasY);
        isClick = true;
    }
});

document.addEventListener('mousemove', function (e) {
    // 処理
    if (e.button === 0) {
        if (!isClick) return;

        var canvasInfo = getCanvasInfo(e);
        if (!canvasInfo.inCanvas) return;

        ctx.lineTo(canvasInfo.canvasX, canvasInfo.canvasY);
        ctx.stroke();
    }
});

document.addEventListener('mouseup', function (e) {
    isClick = false;
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
