class Zue {
  $data: any;
  constructor(options: any) {
    const { proxyObj } = new Observe(
      options.data,
      (target, property) => {
        console.log("get: ", target, property);
      },
      (target, property, value) => {
        console.log("set: ", target, property, value);
      }
    );

    this.$data = proxyObj;
    this.proxyData();
    options.mountded.call(this);
  }
  proxyData() {
    const _this = this;
    for (const key in _this.$data) {
      Object.defineProperty(_this, key, {
        get() {
          return _this.$data[key];
        },
        set(v) {
          if (v === _this.$data[key]) return;
          _this.$data[key] = v;
        },
      });
    }
  }
}

type GetType<T> = (target: T, p: string | symbol, receiver: any) => void;
type SetType<T> = (
  target: T,
  p: string | symbol,
  value: any,
  receiver: any
) => void;
class Observe<T extends object> {
  get: GetType<T>;
  set: SetType<T>;
  obj: any;
  constructor(
    obj: T,
    get: GetType<T>,
    set: SetType<T>,
    type: "proxy" | "defefineProperty" = "proxy"
  ) {
    this.obj = obj;
    this.get = get;
    this.set = set;
    switch (type) {
      case "proxy":
        this.proxyObj = this.byProxy(obj);
        break;
      case "defefineProperty":
        this.proxyObj = this.byDefineProperty(obj);
        break;

      default:
        break;
    }
  }
  proxyObj: T | null = null;
  byProxy: (obj: T) => T = (obj) => {
    const _this = this;
    return new Proxy(obj, {
      get(target: any, property, receiver) {
        if (typeof target[property] === "object") {
          return _this.byProxy.call(_this, target[property]);
        }
        _this.get?.(target, property, receiver);
        return Reflect.get(target, property, receiver);
      },
      set(target, property, value, receiver) {
        if (target[property] === value) return false;
        _this.set?.(target, property, value, receiver);
        return Reflect.set(target, property, value, receiver);
      },
    });
  };
  byDefineProperty = (obj: any) => {
    if (!obj || typeof obj !== "object") return;

    const _this = this;
    for (const key in obj) {
      _this.byDefineProperty.call(_this, obj[key]);
      (function (val) {
        Object.defineProperty(obj, key, {
          enumerable: true,
          configurable: true,
          get() {
            _this.get?.(obj, key, null);
            return val;
          },
          set(newVal) {
            if (val === newVal) return;
            val = newVal;
            _this.set?.(obj, key, val, null);
            obj[key] = val;
          },
        });
      })(obj[key]);
    }

    return obj;
  };
}

class PubSub {
  constructor() {
    this
  }
}
