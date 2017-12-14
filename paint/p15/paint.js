var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var drawing = false;
var beforeX;
var beforeY;

var DRAW_TOOL_PEN = 'pen';
var DRAW_TOOL_LINE = 'line';
var DRAW_TOOL_CIRCLE = 'circle';
var DRAW_TOOL_FILL_CIRCLE = 'fillCircle';
var DRAW_TOOL_RECT = 'rect';
var DRAW_TOOL_FILL_RECT = 'fillRect';

var currentDrawTool = DRAW_TOOL_PEN;

var imageData;

function getCanvasInfo(e) {
    var canvasInfo = {};

    var rect = e.target.getBoundingClientRect();
    canvasInfo.canvasX = e.clientX - rect.left;
    canvasInfo.canvasY = e.clientY - rect.top;

    return canvasInfo;
}

canvas.addEventListener('mousedown', function(e) {
    // 処理
    if (e.button === 0) {
        var canvasInfo = getCanvasInfo(e);

        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        beforeX = canvasInfo.canvasX;
        beforeY = canvasInfo.canvasY;
        drawing = true;
    }
});

canvas.addEventListener('mousemove', function(e) {
    // 処理
    if (e.button === 0) {
        if (!drawing) return;

        var canvasInfo = getCanvasInfo(e);

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
                ctx.moveTo(beforeX, beforeY);
                ctx.lineTo(canvasInfo.canvasX, canvasInfo.canvasY);
                ctx.stroke();
                beforeX = canvasInfo.canvasX;
                beforeY = canvasInfo.canvasY;
                break;
            case DRAW_TOOL_LINE:
                ctx.beginPath();
                ctx.moveTo(beforeX, beforeY);
                ctx.lineTo(canvasInfo.canvasX, canvasInfo.canvasY);
                ctx.stroke();
                break;
            case DRAW_TOOL_CIRCLE:
                ctx.beginPath();
                ctx.arc(beforeX, beforeY, Math.abs(canvasInfo.canvasX - beforeX), 0, Math.PI * 2, false);
                ctx.stroke();
                break;
            case DRAW_TOOL_FILL_CIRCLE:
                ctx.beginPath();
                ctx.arc(beforeX, beforeY, Math.abs(canvasInfo.canvasX - beforeX), 0, Math.PI * 2, false);
                ctx.fill();
                break;
            case DRAW_TOOL_RECT:
                ctx.strokeRect(beforeX, beforeY, canvasInfo.canvasX - beforeX, canvasInfo.canvasY - beforeY);
                break;
            case DRAW_TOOL_FILL_RECT:
                ctx.fillRect(beforeX, beforeY, canvasInfo.canvasX - beforeX, canvasInfo.canvasY - beforeY);
                break;
        }
    }
});

canvas.addEventListener('mouseup', function(e) {
    drawing = false;
});

var color = document.getElementById('color');
color.addEventListener('change', function(e) {
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

var lineWidth = document.getElementById('lineWidth');
lineWidth.addEventListener('change', function(e) {
    var num = e.target.value;
    if (!isNumber(num)) return;
    var lineWidthValue = parseInt(num, 10);
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

var drawToolList = document.querySelectorAll('[name="drawTool"]');
for (var i = 0; i < drawToolList.length; i++) {
    drawToolList[i].addEventListener('click', function(e) {
        currentDrawTool = e.target.value;
    });
}

var savePng = document.getElementById('savePng');
savePng.addEventListener('click', function() {
    saveCanvas();
});

// https://st40.xyz/one-run/article/133/
// canvas上のイメージを保存
function saveCanvas() {
    var imageType = "image/png";
    var fileName = "sample.png";
    // base64エンコードされたデータを取得 「data:image/png;base64,iVBORw0k～」
    var base64 = canvas.toDataURL(imageType);
    // base64データをblobに変換
    var blob = Base64toBlob(base64);
    // blobデータをa要素を使ってダウンロード
    saveBlob(blob, fileName);
}

// Base64データをBlobデータに変換
function Base64toBlob(base64) {
    // カンマで分割して以下のようにデータを分ける
    // tmp[0] : データ形式（data:image/png;base64）
    // tmp[1] : base64データ（iVBORw0k～）
    var tmp = base64.split(',');
    // base64データの文字列をデコード
    var data = atob(tmp[1]);
    // tmp[0]の文字列（data:image/png;base64）からコンテンツタイプ（image/png）部分を取得
    var mime = tmp[0].split(':')[1].split(';')[0];
    //  1文字ごとにUTF-16コードを表す 0から65535 の整数を取得
    var buf = new Uint8Array(data.length);
    for (var i = 0; i < data.length; i++) {
        buf[i] = data.charCodeAt(i);
    }
    // blobデータを作成
    var blob = new Blob([buf], {type: mime});
    return blob;
}

// 画像のダウンロード
function saveBlob(blob, fileName) {
    var url = (window.URL || window.webkitURL);
    // ダウンロード用のURL作成
    var dataUrl = url.createObjectURL(blob);
    // イベント作成
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    // a要素を作成
    var a = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    // ダウンロード用のURLセット
    a.href = dataUrl;
    // ファイル名セット
    a.download = fileName;
    // イベントの発火
    a.dispatchEvent(event);
}
