const aqu = new Aqu({ ctx: ctx, num: 150 });
(function drawFrame(params) {
  window.requestAnimationFrame(drawFrame);
  ctx.clearRect(0, 0, W, H);
  aqu.draw();
})()