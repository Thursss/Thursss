const clearColor = 'rgba(0, 0, 0, .1)',
wordColor = '#33ff33',
words = "0123456789qwertyuiopasdfghjklzxcvbnm,./;'\[]QWERTYUIOP{}ASDFGHJHJKL:ZXCVBBNM<>?",
wordArr = words.split(''),
fontSize = 16,
clumns = w / fontSize,                     //文字降落的列数
drops = [];

for (let i = 0; i < clumns; i++) {
drops[i] = Math.random() * wordArr.length;
}

function draw() {
ctx.save();
ctx.fillStyle = wordColor;
ctx.font = fontSize + 'px arial';

for (let i = 0; i < drops.length; i++) {
    const word = wordArr[Math.floor(Math.random() * wordArr.length)];
    ctx.fillText(word, fontSize * i, drops[i] * fontSize);
    if (drops[i] * fontSize > h && Math.random() > 0.99) {
        drops[i] = 0;
    }
    drops[i]++;
}
ctx.restore();
}

(function drawFrame() {
window.requestAnimationFrame(drawFrame, canvas)
ctx.fillStyle = clearColor;
ctx.fillRect(0, 0, w, h);
draw();
}());