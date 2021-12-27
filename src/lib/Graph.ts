import { CopyAble } from "./CopyAble";
import { GraphNode } from "./GraphNode";

export class Graph<ID, T> implements CopyAble<Graph<ID, T>>,PrintAble {
  connections: Map<ID, ID[]> = new Map();
  data: Map<ID, GraphNode<T>> = new Map();
  hasNode(id: ID): boolean {
    return this.data.has(id);
  }
  addNode(id: ID, data: T) {
    this.data.set(id, new GraphNode(data));
  }

  addBiDirectionalConnection(id1: ID, id2: ID) {
    this.addConnection(id1, id2);
    this.addConnection(id2, id1);
  }
  addConnection(id1: ID, id2: ID) {
    if (!this.hasNode(id1) || !this.hasNode(id2)) {
      throw new Error("Node does not exist");
    }
    if (!this.connections.has(id1)) {
      this.connections.set(id1, [id2]);
    } else {
      this.connections.get(id1)?.push(id2);
    }
  }
  copy(): Graph<ID, T> {
    throw new Error("Method not implemented.");
  }
  print(): void {
    console.log
    this.data.forEach((_value, key) => {
      this.connections.get(key)?.forEach((id) => {
        console.log(`${this.data.get(key)?.value} -> ${this.data.get(id)?.value}`);
      });
    });
  }
}
