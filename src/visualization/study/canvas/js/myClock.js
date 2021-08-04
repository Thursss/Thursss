const circleR = 280;

/**
 * 绘制环形
 * @param {*} param0
 */
function drawCircle({
  x = centerX,
  y = centerY,
  radius = 100,
  color,
  startAngle = getRad(0),
  endAngle = getRad(0),
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
/**
 * 绘制文本
 * @param {*} param0
 */
function drawText({
  text,
  x,
  y,
  font = "28px Helvetica Bold",
  color = "#7FFFD4",
  center = "left",
  textBaseLine = "top",
}) {
  ctx.save();
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = center;
  ctx.textBaseLine = "middle";
  ctx.fillText(text, x, y);
  ctx.restore();
}
/**
 * 获取时间
 * @param {*} params
 */
function getDate() {
  let date = new Date();

  const weekMap = ["日", "一", "二", "三", "四", "五", "六"];
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    week: weekMap[date.getDay()],
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliseconds: date.getMilliseconds(),
  };
}

function drawBase() {
  // 背景
  let gradient = ctx.createRadialGradient(
    getPointX(0),
    getPointY(0),
    5,
    getPointX(0),
    getPointY(0),
    300
  );
  gradient.addColorStop(0, "#03303a");
  gradient.addColorStop(1, "black");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);
  // 小圈
  drawCircle({
    color: "#1cc",
    x: getPointX(0),
    y: getPointY(0),
    endAngle: getRad(rad * 100),
    radius: 3,
    lineWidth: 1,
  });
  drawCircle({
    color: "#1cc",
    x: getPointX(0),
    y: getPointY(0),
    endAngle: getRad(rad * 100),
    radius: circleR,
    lineWidth: 1,
  });
}

function drawNum() {
  const a = 12;
  const r = (Math.PI * 2) / a;
  for (let i = 0 - a / 4 + 1; i <= a - a / 4; i++) {
    const x = Math.cos(r * i) * circleR,
      y = Math.sin(r * i) * circleR + 14;
    let offsetX = 0,
      offsetY = 0;

    const w = (i + a / 4 - 1) / a;

    if (w < 0.25) {
      offsetX = 16;
      offsetY = -16;
    } else if (w < 0.5) {
      offsetX = 16;
      offsetY = 16;
    } else if (w < 0.75) {
      offsetX = -16;
      offsetY = 16;
    } else {
      offsetX = 16;
      offsetY = -16;
    }

    if ([0, 0.25, 0.5, 0.75, 1].includes(w)) {
      offsetX = 0;
      offsetY = 0;
    }
    drawText({
      text: i + a / 4,
      center: "center",
      x: getPointX(x + offsetX),
      y: getPointY(y + offsetY),
    });
  }
}

function drawEngNeedle() {
  const a = 24;
  const r = (Math.PI * 2) / a;
  for (let i = 0 - a / 4 + 1; i <= a - a / 4; i++) {
    const x = Math.cos(r * i) * circleR,
      y = Math.sin(r * i) * circleR + 14;
    let offsetX = 0,
      offsetY = 0;

    const w = i / a;
    if (w <= 0.25) {
      offsetX = 16;
      offsetY = -16;
    } else if (w <= 0.5) {
      offsetX = 16;
      offsetY = 16;
    } else if (w <= 0.75) {
      offsetX = -16;
      offsetY = 16;
    } else {
      offsetX = 16;
      offsetY = -16;
    }

    drawText({
      text: i + a / 4,
      center: "center",
      x: getPointX(x + offsetX),
      y: getPointY(y + offsetY),
    });
  }
}
function drawTime() {
  const { year, month, day, week, hours, minutes, seconds, milliseconds } =
    getDate();
  const sec = seconds + milliseconds / 1000;

  // 时
  drawCircle({
    color: "#31c",
    x: getPointX(0),
    y: getPointY(0),
    endAngle: getRad(((rad * (hours > 11 ? hours - 12 : hours)) / 12) * 100),
    radius: 255,
    lineWidth: 1,
  });
  // 分
  drawCircle({
    color: "#3c1",
    x: getPointX(0),
    y: getPointY(0),
    endAngle: getRad(((rad * minutes) / 60) * 100),
    radius: 250,
    lineWidth: 1,
  });
  // 秒
  drawCircle({
    color: "#903",
    x: getPointX(0),
    y: getPointY(0),
    endAngle: getRad(((rad * sec) / 60) * 100),
    radius: 245,
    lineWidth: 1,
  });
  // 时间
  drawText({
    text: `${year}年${month}月${day}日 星期${week}`,
    x: getPointX(0),
    y: getPointY(-15),
    center: "center",
    textBaseLine: "middle",
  });
  drawText({
    text: `${hours}时${minutes}分${seconds}秒`,
    x: getPointX(0),
    y: getPointY(30),
    center: "center",
    textBaseLine: "middle",
  });
}

(function drawFrame() {
  window.requestAnimationFrame(drawFrame, canvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBase();
  drawNum();
  // drawEngNeedle();
  drawTime();
})();
