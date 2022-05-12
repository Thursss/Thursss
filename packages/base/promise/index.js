const PENDING = "pending";
const FULFILLED = "fulfiled";
const REJECTED = "rejected";

/**
 * Promise
 */
class ZPromise {
  constructor(hander) {
    this.state = PENDING;
    this.value = undefined;

    this.successCallback = [];
    this.failureCallback = [];

    try {
      hander(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      this.reject(this);
    }
  }

  /**
   *
   * @param {any} value
   */
  resolve(value) {
    if (this.state !== PENDING) return;
    this.state = FULFILLED;
    this.value = value;
    setTimeout(() => {
      this.successCallback.forEach((call) => {
        call(value);
      });
    });
  }
  /**
   *
   * @param {*} reason
   */
  reject(reason) {
    if (this.state !== PENDING) return;
    this.state = REJECTED;
    this.value = reason;
    setTimeout(() => {
      this.failureCallback.forEach((call) => {
        call(reason);
      });
    });
  }

  /**
   *
   */
  then(resolve, reject) {
    resolve && this.successCallback.push(resolve);
    reject && this.failureCallback.push(reject);
    return this;
  }

  /**
   *
   */
  static all() {
    console.log("all");
  }
}
