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

  //const optimCountBy = arr => arr.filter(item => item > 2).length;
  //console.log(optimCountBy([1, 2, 3, 4, 5]));

  function decorator(a) {
    return function() {
      if (arguments[0]){
        return arguments[0];
      } else {
        return 'no argements'
      }
    }
  }
  //awesome();

  // const decor = decorator('awesome');
  // console.log(decor());
  // console.log(decor('super cool'));


  const debounce = (f, ms) => {
    let isCooldown = false;

    return function() {
      if (isCooldown) return;
      f.apply(this, arguments);
      isCooldown = true;
      setTimeout(() => isCooldown = false, ms);
    }
  };

  function test(a) {
    console.log(a);
  }

  const d = debounce(test, 1000);

  // d(1);
  // d(2);
  // d(3);
  // d(4);
  // d(5);
  // d(6);
  // d(7);
  // setTimeout(() => d(8), 100);
  // setTimeout(() => d(9), 1000);
  // setTimeout(() => d(10), 1500);
  // setTimeout(() => d(11), 2000);
  // setTimeout(() => d(12), 2100);


  const throttle = (f, ms) => {
    let isThrottled = false;
    let savedArgs;
    let savedThis;

    function wrapper() {
      if (isThrottled) {
        savedArgs = arguments;
        savedThis = this;
        return;
      }

      f.apply(this, arguments);
      isThrottled = true;

      setTimeout(function() {
        isThrottled = false;
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms)
    };

    return wrapper;
  };

  const th = throttle(test, 1000);

};
usefulFunctions();
