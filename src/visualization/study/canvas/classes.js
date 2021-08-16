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

// 水草
class Aqu {
  ctx;
  startPoint = [];
  endPoint1 = [];
  endPoint2 = [];
  num = 0;
  beta = 0;
  color = "#3b154e";
  constructor({ ctx, num = 100, color = "#3b154e" }) {
    this.ctx = ctx;
    this.num = num;
    this.color = color;
    for (let i = 0; i < this.num; i++) {
      this.startPoint[i] = [(Math.random() + i) * 12, this.ctx.canvas.height];
      this.endPoint1[i] = [
        this.startPoint[i][0],
        this.ctx.canvas.height / 2 + Math.random() * 125,
      ];
      this.endPoint2[i] = [this.startPoint[i][0], this.endPoint1[i][1] - 160];
    }
  }
  draw() {
    if (!this.ctx) {
      console.error("not found canvas");
      return;
    }
    this.ctx.save();
    this.ctx.lineWidth = 14;
    this.ctx.lineCap = "round";
    this.ctx.globalAlpha = 0.8;
    this.ctx.strokeStyle = this.color;
    let c = .008;
    this.beta += c;
    for (let i = 0; i < this.num; i++) {
      ctx.beginPath();

      this.endPoint2[i][0] += (Math.sin(Math.PI * this.beta) * Math.random() * 2);
      this.ctx.moveTo(this.startPoint[i][0], this.startPoint[i][1]);
      this.ctx.quadraticCurveTo(
        this.endPoint1[i][0],
        this.endPoint1[i][1],
        this.endPoint2[i][0] - 25,
        this.endPoint2[i][1]
      );
      this.ctx.stroke();
    }
    ctx.restore();
  }
}
