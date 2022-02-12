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

//  ES5
function Tree() {
  this.root = null;
}

Tree.prototype.addValue = function (val) {
  let node = new Node(val);

  if (this.root === null) {
    this.root = node;
  } else {
    this.root.addNode(node);
  }
};

Tree.prototype.traverse = function () {
  this.root.visit();
};

function Node(val) {
  this.value = val;
  this.left = null;
  this.right = null;
}

Tree.prototype.search = function (val) {
  return this.root.search(val);
};

Node.prototype.addNode = function (node) {
  if (node.value < this.value) {
    if (this.left === null) {
      this.left = node;
    } else {
      this.left.addNode(node);
    }
  } else if (node.value > this.value) {
    if (this.right === null) {
      this.right = node;
    } else {
      this.right.addNode(node);
    }
  }
};

Node.prototype.visit = function () {
  if (this.left !== null) {
    this.left.visit();
  }

  console.log(this.value);

  if (this.right !== null) {
    this.right.visit();
  }
};

Node.prototype.search = function (val) {
  if (this.value === val) {
    return val;
  } else if (val < this.value && this.left !== null) {
    return this.left.search(val);
  } else if (val > this.value && this.right !== null) {
    return this.right.search(val);
  }
};

let tree = new Tree();
for (let i = 1; i < 20; i++) {
  tree.addValue(Math.floor(Math.random() * 100));
}

// tree.traverse();
// console.log(tree);

//  ES6
class TreeC {
  constructor() {
    this.root = null;
  }

  addValue(val) {
    let node = new NodeC(val);

    if (this.root === null) {
      this.root = node;
    } else {
      this.root.addNode(node);
    }
  }

  traverse() {
    this.root.visit();
  }

  search(val) {
    return this.root.search(val);
  }
}

class NodeC {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }

  addNode(node) {
    if (node.value < this.value) {
      if (this.left === null) {
        this.left = node;
      } else {
        this.left.addNode(node);
      }
    } else if (node.value > this.value) {
      if (this.right === null) {
        this.right = node;
      } else {
        this.right.addNode(node);
      }
    }
  }

  visit() {
    if (this.left !== null) {
      this.left.visit();
    }

    console.log(this.value);

    if (this.right !== null) {
      this.right.visit();
    }
  }

  search(val) {
    if (this.value === val) {
      return val;
    } else if (val < this.value && this.left !== null) {
      return this.left.search(val);
    } else if (val > this.value && this.right !== null) {
      return this.right.search(val);
    }
  }
}

let treeCl = new TreeC();
for (let i = 1; i < 20; i++) {
  treeCl.addValue(Math.floor(Math.random() * 100));
}
// treeCl.addValue(8);
// treeCl.addValue(3);
// treeCl.traverse();
// console.log(treeCl);
