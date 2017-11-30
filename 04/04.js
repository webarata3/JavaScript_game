var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.arc(50, 50, 40, 0, Math.PI * 2, false);
ctx.stroke();

ctx.beginPath();
ctx.arc(150, 150, 40, 0, Math.PI * 2, false);
ctx.fill();
