export class Stack<T> {
  data: T[] = [];
  push(item: T) {
    this.data.push(item);
  }
  pop(): T | undefined {
    return this.data.pop();
  }
}