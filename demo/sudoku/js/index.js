const canvas = document.getElementById('sudoku');
const initBut = document.getElementsByClassName('initBut')[0];
const boxInfo = canvas.getBoundingClientRect();
const ctx = canvas.getContext('2d');
// 线条信息
const XLineCount = 9;
const YLineCount = 9;
const l1 = boxInfo.height / YLineCount;
const l2 = boxInfo.width / XLineCount;
let sudoku = [];

// 获取数独题库
$.ajax({
  url: './sudoku.json',
  datatype: 'json',
  async: false,
  data: {},
  success: (result) => {
    sudoku = result;
  }
});

// 绘制直线方法
function drawLine({ beginX, beginY, endX, endY }, lineWidth = 1, fillStyle = 'rgb(0, 0, 0, .5)') {
  ctx.beginPath();
  ctx.moveTo(beginX, beginY);
  ctx.lineTo(endX, endY);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = fillStyle;
  ctx.closePath();
  ctx.stroke();
}
// 绘制数字
function drawFont({ offsetXPint, offsetYPint }, font, fontSize = '30') {
  ctx.font = `${fontSize}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(font, offsetXPint, offsetYPint, l1);
}
// 初始化
function initSudoku() {
  ctx.clearRect(0, 0, boxInfo.width, boxInfo.height);
  // 循环绘制横线
  for (let i = 1; i < YLineCount; i++) {
    let lineWidth = 1;
    let fillStyle = 'rgb(0, 0, 0, .2)';
    if (i % 3 === 0) {
      lineWidth = 2
      fillStyle = 'rgb(0, 0, 0, 1)';
    }
    drawLine({ beginX: 0, beginY: i * l1, endX: boxInfo.width, endY: i * l1 }, lineWidth, fillStyle);
  }
  // 循环绘制竖线
  for (let i = 1; i < XLineCount; i++) {
    let lineWidth = 1;
    let fillStyle = 'rgb(0, 0, 0, .2)';
    if (i % 3 === 0) {
      lineWidth = 2
      fillStyle = 'rgb(0, 0, 0, 1)';
    }
    drawLine({ beginX: i * l2, beginY: 0, endX: i * l2, endY: boxInfo.height }, lineWidth, fillStyle);
  }
  // 循环绘制数字
  const numArr = sudoku[0]?.num.split('');
  for (let i = 0; i < numArr.length; i++) {
    if (numArr[i] == 0) continue;
    const x = i % 9;
    const y = Math.floor(i / 9);
    drawFont({offsetXPint: (l2 * x + l2 / 2), offsetYPint: (l1 * y + l1 / 2)}, numArr[i]);
  }
}

// 监听点击事件
canvas.addEventListener('click', function ({ offsetX, offsetY }) {
  const offsetYPint = Math.ceil(offsetY / l1) * l1 - (l1 / 2);
  const offsetXPint = Math.ceil(offsetX / l2) * l2 - (l2 / 2);
  drawFont({ offsetXPint, offsetYPint }, '×');
});
initBut?.addEventListener('click', initSudoku);

// 开始
initSudoku();