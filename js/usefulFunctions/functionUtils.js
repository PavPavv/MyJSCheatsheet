'use strict';

const usefulFunctions = () => {

  // Input's length
  const inputLength = () => {
    let input = 'test';
    console.log(input.length);
  };
  //inputLength();

  //////////////////// HOF's: ///////////////
  const repeat = (n, action) => {
    for (let i = 0; i < n; i++) {
      action(i);
    }
  };

  let arr = [];
  repeat(5, i => {
    arr.push(`Test ${i + 1}`);
  });
  //console.log(arr);


  const unless = (test, then) => {
    if (test) {
      then();
    }
  };

  // repeat(12, n => {
  //   unless(n % 2 === 0, () => {
  //     console.log(n, ' is even');
  //   })
  // });


  // Find amount of elements with a certain condition
  const countBy = (items, group) => {
    let result = 0;
    let counts = [];
    for (let item of items) {
      let name = group(item);
      let known = counts.findIndex(c => c.name === name);
      if (known === -1) {
        counts.push({ name, count: 1 });
      } else {
        counts[known].count++;
      }
    }

    for (let count of counts) {
      if (count.name === true) {
        result = count.count;
      }
    }

    return result;
  };
  //console.log(countBy([1, 2, 3, 4, 5], n => n > 2));

  const optimunCountBy = arr => arr.filter(item => item > 2).length;
  console.log(optimunCountBy([1, 2, 3, 4, 5]));

};
usefulFunctions();



