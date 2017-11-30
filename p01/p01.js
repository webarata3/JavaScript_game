var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

document.addEventListener('mousedown', function(e) {
    // 処理
    if (e.button === 0) {
        var rect = e.target.getBoundingClientRect();
        var canvasX = e.clientX - rect.left;
        var canvasY = e.clientY - rect.top;
        alert(canvasX + ', ' + canvasY);
    }
});
