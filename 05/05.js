var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.strokeStyle = 'rgb(255, 0, 0)';
ctx.beginPath();
ctx.arc(50, 50, 40, 0, Math.PI * 2, false);
ctx.stroke();

ctx.fillStyle = '#0000ff';
ctx.beginPath();
ctx.arc(150, 150, 40, 0, Math.PI * 2, false);
ctx.fill();
