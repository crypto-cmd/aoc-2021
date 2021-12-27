import chalk from "chalk";
import tinycolor from "tinycolor2";

type SinglyLinkedListNode<T> = {
  next?: SinglyLinkedListNode<T>;
  value: T;
};
export class SinglyLinkedList<T> implements PrintAble {
  head: SinglyLinkedListNode<T> | undefined;
  tail: SinglyLinkedListNode<T> | undefined;
  addNode(value: T) {
    if (this.head === undefined && this.tail === undefined) {
      this.head = this.tail = { value };
      return this;
    }
    (this.tail as SinglyLinkedListNode<T>).next = { value };
    this.tail = this.tail?.next;
    return this;
  }
  forEach(callback: (node: SinglyLinkedListNode<T>, value: T) => void) {
    let current = this.head;
    while (current) {
      callback(current, current.value);
      current = current.next;
    }
  }
  print(): void {
    console.log();
    let statement = "";
    let current = this.head;
    while (current) {
      statement += chalk.greenBright(current.value);
      if (current.next) {
        statement += " -> ";
      }
      current = current.next;
    }
    console.log(statement);
  }
}
