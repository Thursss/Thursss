export class ArrayList<T> {
  constructor(private elements: T[]) {}

  public get(index: number) {
    return this.elements[index];
  }
  public show() {
    this.elements.forEach((element) => console.log(element));
  }

  public remove(index: number): number;
  public remove(obj: T): T;
  public remove(indexOrObj): any {
    this.elements = this.elements.filter((ele, index) => {
      if (typeof indexOrObj === "number") {
        return indexOrObj !== index;
      } else {
        return indexOrObj !== ele;
      }
    });
    return indexOrObj;
  }
}
