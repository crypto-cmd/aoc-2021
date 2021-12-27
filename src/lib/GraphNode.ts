import { CopyAble } from "./CopyAble";

export class GraphNode<T> implements CopyAble<GraphNode<T>>, ValueAble<T> {
  constructor(private data: T) {}
  get value(): T {
    return this.data;
  }
  set value(value: T) {
    this.data = value;
  }
  copy(): GraphNode<T> {
    return new GraphNode(this.value);
  }
}
