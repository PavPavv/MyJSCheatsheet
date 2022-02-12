## Data structures

Linear data structures are simple in direction. A linked list is a list of nodes (each containing their own data) that are linked from one node to the next (and to the previous, for a doubly linked list). A stack builds upward like a tower of data. Each node stacking atop another, and shortens in a last in first out (LIFO) manner. A queue is a line of nodes that elongate from the end of the line and shortens in a first in first out (FIFO) mechanism.

Binary data structures are like a fork in a road of data. The nodes build like the branches of a tree or a heap of rocks.

## Binary Search Tree

Compared to a normal tree, BST has the following properties:

- every left child has a smaller value than its parent
- every right child has a larger value than its parent
- every node can contain from 0 to 2 children

```javascript
const binarySearchTree = {
  value: 4,

  left: {
    value: 2,
    left: {
      value: 1,
    },
    right: {
      value: 3,
    },
  },

  right: {
    value: 5,
    right: {
      value: 6,
    },
  },
};
```
