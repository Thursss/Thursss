/**
 * 环形加载动画
 */

// 增加速度
let speed = 0.00000001;

function getRad(radVal) {
  return radVal - rad * 25;
}

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
  ctx.closePath();
  ctx.restore();
}

function drawText({
  color,
  text,
  font = "40px Arial",
  x = centerX,
  y = centerY,
}) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, x, y);
  ctx.restore();
}

(function drawFrame() {
  window.requestAnimationFrame(drawFrame, canvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle({
    color: "#ddd",
    endAngle: getRad(rad * 100),
  });
  drawText({
    color: "#1cc",
    text: `${speed.toFixed(0)}%`,
  });
  drawCircle({
    color: "#1cc",
    endAngle: getRad(rad * speed),
  });
  if (speed > 100) speed = 0;
  speed += 0.1;
})();
