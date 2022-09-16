class LocalStorage {
  private static instance: LocalStorage;
  private constructor() {
    console.log("创建单例对象");
  }

  public static getInstance() {
    if (!this.instance) this.instance = new LocalStorage();
    return this.instance;
  }

  public setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getItem() {}
}

export default LocalStorage;
