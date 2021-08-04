// (function render() {
//     window.requestAnimationFrame(render, canvas)
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// })()
/**
 * 绘制环形
 * @param {*} param0
 */
function drawCircle({
  x = centerX,
  y = centerY,
  radius = 100,
  color,
  startAngle = 0,
  endAngle = 0,
  lineWidth = 12,
  anticlockwise = false,
}) {
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
  ctx.stroke();
  ctx.restore();
}

drawCircle({
  color: "#1cc",
  x: getPointX(0),
  y: getPointY(0),
  endAngle: rad * 100,
  radius: 3,
  lineWidth: 2,
});
drawCircle({
  color: "#1cc",
  x: getPointX(0),
  y: getPointY(0),
  endAngle: rad * 100,
  radius: 230,
  lineWidth: 2,
});
