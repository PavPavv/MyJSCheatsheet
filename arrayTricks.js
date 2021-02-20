"use strict";
const script = () => {
  const getLastElsOf2Arrs = () => {
    let arr1 = [1, 2, 3, 4, 5];
    let arr2 = [0, 1, 3, 4, 5, 6];

    let arr33 = [arr1[arr1.length - 1], arr2[arr2.length - 1]];
    console.log(arr33);
  };
  getLastElsOf2Arrs();

  const getUniqueElsOf2Arrs = () => {
    let arr1 = [1, 2, 3, 4, 5];
    let arr2 = [0, 1, 3, 4, 5, 6];

    let arr4 = arr2.filter((x) => !arr1.includes(x));
    console.log(arr4);
  };
  getUniqueElsOf2Arrs();
};
script();
