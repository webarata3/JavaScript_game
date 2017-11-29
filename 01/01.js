var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// 直線を描く
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(90, 90);
ctx.stroke();
