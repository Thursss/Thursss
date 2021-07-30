/**
 * 环形加载动画
 */

//
const canvas = document.querySelector("canvas"),
  context = canvas.getContext("2d"),
  centerX = canvas.width / 2,
  centerY = canvas.height / 2,
  rad = (Math.PI * 2) / 100;
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
  context.save();
  context.beginPath();
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.arc(
    x,
    y,
    radius,
    getRad(startAngle),
    getRad(endAngle),
    anticlockwise
  );
  context.stroke();
  context.closePath();
  context.restore();
}

function drawText({
  color,
  text,
  font = "40px Arial",
  x = centerX,
  y = centerY,
}) {
  context.save();
  context.fillStyle = color;
  context.font = font;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, x, y);
  context.restore();
}

(function drawFrame() {
  window.requestAnimationFrame(drawFrame, canvas);
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle({
    color: "#ddd",
    endAngle: rad * 100,
  });
  drawText({
    color: "#1cc",
    text: `${speed.toFixed(0)}%`,
  });
  drawCircle({
    color: "#1cc",
    endAngle: rad * speed,
  });
  if (speed > 100) speed = 0;
  speed += 0.1;
})();
