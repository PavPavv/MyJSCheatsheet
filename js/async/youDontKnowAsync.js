//"use strict";

var a = 1;
var b = 2;

function foo() {
  a++;
  b = b * a; // 4
  a = b + 3; //  7
}

function bar() {
  b--; //  3
  a = 8 + b; //  11
  b = a * 2; //  22
}

foo();
bar();

//console.log(a);
//console.log(b);

//console.log("1");

function test() {
  console.log("2");
  (function () {
    console.log("3");
  })();
}

//test();
////////////////////////////////////////////////////////////////////////////////
function eventLoop() {
  jsTest();
  console.log("main log");

  function test() {
    console.log("test");
  }

  const promise = new Promise((resolve, reject) => {
    return resolve(console.log("resolve"));
  });

  const promise1 = new Promise((resolve, reject) => {
    return resolve(console.log("kingslayer"));
  });

  const promise2 = new Promise((resolve, reject) => {
    return resolve(promise1);
  })
    .then((res) => {
      console.log("obey");
    })
    .finally((res) => {
      console.log("finally0");
    });

  console.log("middle work");

  promise
    .then((res) => {
      console.log("res");
    })
    .then((res) => {
      setTimeout(() => {
        console.log("1000");
      }, 1000);
    })
    .then((res) => {
      setTimeout(() => {
        console.log("__");
      });
    })
    .catch((err) => {
      test();
    })
    .finally((res) => {
      console.log("finally");
    });

  (function () {
    console.log("super test");
  })();

  function jsTest() {
    console.log("js");
  }
}
//eventLoop();
//  output:
// js, main log, resolve, super test, res, finally, __, 1000

let a1 = 1;
let b1 = 2;

[b1, a1] = [a1, b1];
console.log(`a1: ${a1}`, `b1: ${b1}`);

const person = {
  greeting: function (name) {
    return `Hi, I'm ${name}!`;
  },
};

//console.log(person.greeting("Albert"));

const albert = {};

albert.__proto__ = person;
console.log(albert);
console.log(albert.greeting("Albert"));

function trickySum(a) {
  console.log(a);

  return function (b) {
    console.log(b + 1);

    return function (c) {
      console.log(c + c);
    };
  };
}

//console.log(trickySum(1)(2)(3));
