type TargetProp = { [key in string]: any };

class ListenterObject<T extends object> {
  public data: ProxyHandler<T>;
  private setBind: (
    target: TargetProp,
    p: string,
    value: any,
    receiver: any
  ) => boolean;
  private getBind: (target: TargetProp, p: string, receiver: any) => any;
  constructor(
    data: TargetProp,
    setBind: (target: object, p: string, value: any, receiver: any) => boolean,
    getBind: (target: TargetProp, p: string, receiver: any) => any
  ) {
    this.setBind = setBind;
    this.getBind = getBind;
    this.data = this.wacthData(data);
  }

  private wacthData(data: object): ProxyHandler<T> {
    const _this = this;
    return new Proxy(data, {
      get(target: TargetProp, p: string, receiver: any) {
        if (typeof target[p] === "object")
          return _this.wacthData.call(_this, target[p]);
        _this.getBind(target, p, receiver);
        return Reflect.get(target, p, receiver);
      },
      set(target: TargetProp, p: string, value: any, receiver: any) {
        if (target[p] === value) return false;
        _this.setBind(target, p, value, receiver);
        return Reflect.set(target, p, value, receiver);
      },
    });
  }
}
