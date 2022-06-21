function throttle(callBack, timeout) {
  let timer;
  return function (...args) {
    const _this = this;
    if (timer) return;
    timer = setInterval(() => {
      callBack.apply(_this, args);
      timer = null;
    }, timeout);
  };
}
