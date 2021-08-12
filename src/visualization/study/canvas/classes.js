// 箭头
class Arrow {
  x = 0;
  y = 0;
  rotation = 0;
  color = "#ffff00";
  constructor({ x = 0, y = 0, rotation = 0, color = "#ffff00" }) {
    this.x = x;
    this.y = y;
    this.rotation = rotation; //初始旋转角度
    this.color = color;
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y); //将坐标移到this.x 和 this.y
    context.rotate(this.rotation); //设置旋转角度
    context.lineWidth = 5; //设置线宽
    context.fillStyle = this.color; //设置填充色
    context.beginPath(); //路径开始
    context.moveTo(-50, -25);
    context.lineTo(0, -25);
    context.lineTo(0, -50);
    context.lineTo(50, 0);
    context.lineTo(0, 50);
    context.lineTo(0, 25);
    context.lineTo(-50, 25);
    context.closePath(); //路径闭合
    context.stroke(); //描边
    context.fill(); //填充
    context.restore();
  }
}
