const roundArr = [];
let a = -Math.PI / 2;
for (let i = 0; i < 50; i++) {
  roundArr[i] = new Round({
    centerPointX: centerX * (Math.random() * 2),
    centerPointY: centerY * (Math.random() * 2),
    radius: i * 5 * Math.random(),
    fillStyle: "#393",
  });
}

(function drawFrame() {
  window.requestAnimationFrame(drawFrame);
  ctx.clearRect(0, 0, W, H);
  a += 0.03;
  for (let i = 0; i < roundArr.length; i++) {
    const round = roundArr[i];
    round.centerPointX = round.centerPointX + Math.sin(a) * Math.random() * 10;
    round.centerPointY = round.centerPointY + Math.sin(a) * Math.random() * 10;
    round.draw(ctx);
  }
})();
