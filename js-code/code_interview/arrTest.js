//  'Everything in JS is object' - falsy statement. Everything in JS is function!

// console.log(undefined);
// console.log(null);
// console.log(Object); //  the only way here to get function with type and prototype
// console.log(Object.create(null));

//  basic simple example
//  Wrong attitude because types built with functions in JS, not with
//  primitive leterals.
function wrongApproach() {
  const afternoon = {
    pr: {
      cake: function () {
        return "cake!";
      },
    },
  };

  console.log(afternoon);

  //  Funaction as a 1 class object:
  //  a - value
  const result = afternoon.pr.cake();
  // console.log(result);

  //  link
  const t = afternoon.pr.cake;
  // console.log(t());

  afternoon.pr.tea = function () {
    return "tea!";
  };

  //  prototyping
  const teaNow = afternoon.pr.tea();
  // console.log(teaNow);
  //
  // console.log(afternoon.cake()); //  error
}
//wrongApproach();
////////////////////////////////////////////////////////////////////////////////

//  The core of JS work is function!
//  That's why JS is a truly functional programming language, I'd say Function-oriented
//  and not Object-orienteb. And classes in JS is a foreign thing!

// console.log(function f(a, b) {
//   return a + b;
// });
//  arguments: null // coolection of arguments, accessable only inside the function, currently deprecated
//  caller: null  //  returns a function in which this function was called, accessable only inside the function, currently deprecated
//  length: 2
//  name: 'f'
//  prototype: {
//    constructor: function() {
//      arguments: null
//      caller: null
//      length: 0
//      name: ''
//      prototype {
//        ...
//      }
//    }
//  }

function rightApproach() {
  'use strict';
  function afternoon() {
    test: 'test';
  }

  const tttest = () => {}
  //console.log(afternoon.test)
  console.log(afternoon.constructor);
  console.log(tttest.constructor);



  const football = {
    main: 'ball',
  };
  

  console.log(Object.getPrototypeOf([]))
}
rightApproach();
