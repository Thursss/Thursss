function debounce(callBack, timeout, now) {
  let timer;
  return function (...args) {
    const _this = this;
    if (!timer && now) callBack.apply(_this, args);
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callBack.apply(_this, args);
    }, timeout);
  };
}
