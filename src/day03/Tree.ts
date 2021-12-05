type Binary = "1" | "0";

export type TreeNode = {
  data: Binary;
  numChildren: number;
  ones: TreeNode;
  zeroes: TreeNode;
};
export type RootNode = {
  data: "Root";
  zeroes: TreeNode;
  ones: TreeNode;
};
export const isNonExistent = (node: TreeNode | RootNode) => {
  // console.log({data: node.data, numChildren: node?.numChildren});
  return (node.zeroes?.numChildren === undefined && node.ones?.numChildren === undefined);
}
export class Tree {
  root: RootNode;
  constructor() {
    this.root = {
      data: "Root",
      zeroes: {} as TreeNode,
      ones: {} as TreeNode,
    };
  }
  add(value: string) {
    const chars = value.split("");
    let currentNode: TreeNode | RootNode = this.root;
    for (const char of chars) {
      if (char === "0") {
        if (currentNode.zeroes.data === undefined) {
          currentNode.zeroes = {
            data: "0",
            numChildren: 0,
            ones: {} as TreeNode,
            zeroes: {} as TreeNode,
          };
        }

        currentNode = currentNode.zeroes;
      } else {
        if (currentNode.ones.data === undefined) {
          currentNode.ones = {
            data: "1",
            numChildren: 0,
            ones: {} as TreeNode,
            zeroes: {} as TreeNode,
          };
        }
        currentNode = currentNode.ones;
      }

        currentNode.numChildren++;

    }
  }
}
