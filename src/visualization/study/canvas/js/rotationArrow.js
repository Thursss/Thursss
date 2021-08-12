let arrow = new Arrow({ x: centerX, y: centerY });
arrow.draw(ctx);
var mouse = utils.captureMouse(canvas);

//动画循环函数
(function drawFrame() {
  window.requestAnimationFrame(drawFrame);
  ctx.clearRect(0, 0, W, H);

  //获取dy,dx值
  var dx = mouse.x - arrow.x,
    dy = mouse.y - arrow.y;

  //设置旋转角度
  arrow.rotation = Math.atan2(dy, dx);

  //调用draw方法画出
  arrow.draw(ctx);
})();
