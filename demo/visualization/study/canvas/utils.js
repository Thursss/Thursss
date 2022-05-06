const utils = {
  captureMouse(element) {
    //定义一个名为mouse的对象
    var mouse = { x: 0, y: 0 };
    element.addEventListener(
      "mousemove",
      function (event) {
        let x, y;
        //获取鼠标位于当前屏幕的位置， 并作兼容处理
        if (event.pageX || event.pageY) {
          x = event.pageX;
          y = event.pageY;
        } else {
          x =
            event.clientX +
            document.body.scrollLeft +
            document.documentElement.scrollLeft;
          y =
            event.clientY +
            document.body.scrollTop +
            document.documentElement.scrollTop;
        }
        //将当前的坐标值减去元素的偏移位置，即为鼠标位于当前canvas的位置
        x -= element.offsetLeft;
        y -= element.offsetTop;

        mouse.x = x;
        mouse.y = y;
      },
      false
    );
    return mouse;
  }
}