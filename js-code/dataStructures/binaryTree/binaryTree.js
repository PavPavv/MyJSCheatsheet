const binaryTree = {
  value: 1,

  right: {
    value: 3,
    right: {
      value: 6,
      right: {
        value: 8,
        right: null,
        left: null,
      },
      left: null,
    },
    left: null,
  },

  left: {
    value: 2,
    right: {
      value: 5,
      left: null,
      right: null,
    },
    left: {
      value: 4,
      right: null,
      left: {
        value: 7,
        right: null,
        left: null,
      },
    },
  },
};

const findDeepestLeavesSum = (root) => {
  let maxDepth = 0;
  const obj = {};

  const inspectObj = (node, currentDepth = 1) => {
    const { value, left, right } = node;
    console.log(node);

    if (left) inspectObj(left, currentDepth + 1);
    if (right) inspectObj(right, currentDepth + 1);

    if (!left && !right) {
      if (currentDepth > maxDepth) maxDepth = currentDepth;
      const currentSum = obj[currentDepth] ? obj[currentDepth] : 0;
      obj[currentDepth] = currentSum + value;
    }
  };

  inspectObj(root);

  return obj[maxDepth];
};

console.log(findDeepestLeavesSum(binaryTree));
