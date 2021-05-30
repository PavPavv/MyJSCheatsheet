'use strict';

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

repeat(12, n => {
  unless(n % 2 === 0, () => {
    console.log(n, ' is even');
  })
});



