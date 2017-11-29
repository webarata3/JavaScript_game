var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// 塗りつぶしの色
ctx.fillStyle = "rgb(255, 0, 0)";
// 線の色
ctx.strokeStyle = "rgb(0, 0, 255)";
// 色はRGB 10進数の指定。4つ目の引数を指定すると透明度の指定1.0は透明にしない0.0は完全に透明
// 文字列として16進数で表記もできる '#ff0000'

// 直線を描く
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(90, 90);
ctx.stroke();

// パスを繋げる 三角形を描く
ctx.beginPath();
ctx.moveTo(40, 40);
ctx.lineTo(60, 40);
ctx.lineTo(50, 30);
ctx.closePath();
ctx.stroke();

// 矩形（長方形）を描く
// x, y, w, h
ctx.fillRect(10, 10, 40, 40);
ctx.clearRect(20, 20, 20, 20);
ctx.strokeRect(60, 60, 50, 50);

// 円を描く
ctx.beginPath();
ctx.arc(50, 50, 40, 0, Math.PI * 2, false);
ctx.stroke();

ctx.beginPath();
// x, y, 半径, 開始角度、終了角度, 円の描く方向falseが時計回り、trueが反時計回り
ctx.arc(150, 150, 40, 0, Math.PI * 2, false);
ctx.fill();
