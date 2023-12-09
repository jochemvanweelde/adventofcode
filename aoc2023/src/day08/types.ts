type NodeName = string;

type Node = {
  left: NodeName;
  right: NodeName;
}

type Tree = {
  [key: string]: Node;
}