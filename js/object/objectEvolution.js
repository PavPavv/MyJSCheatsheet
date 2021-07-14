'use strict';

// simple object
const calculator = {
  a: 0,
  b: 0,

  read(num1, num2) {
    this.a = parseInt(num1) || this.b;
    this.b = parseInt(num2) || this.a;
  },

  getValues() {
    return `${this.a}, ${this.b}`;
  },

  sum() {
    return this.a + this.b;
  },

  mul() {
    return this.a * this.b;
  },

};

// calculator.read();
// console.log(calculator.getValues());
// calculator.read(3, 3);
// console.log(calculator.getValues());
// console.log(calculator.sum());
// console.log(calculator.mul());
// console.log(calculator.getValues());
/////////////////////////////////////////////////////////

// es5 constructor
function Calculator() {
  this.a = 0;
  this.b = 0;

  this.read = function (num1, num2) {
    this.a = num1;
    this.b = num2;
  }

  this.sum = function () {
    return this.a + this.b;
  }

  this.mul = function () {
    return this.a * this.b;
  }

  this.getValues = function () {
    return `a is ${this.a} and b is ${this.b}`;
  }
};

const es5Calc = new Calculator();
// es5Calc.read(3,3);
// console.log(es5Calc.sum(3,3));
// console.log(es5Calc.mul(3,3));
// console.log(es5Calc.getValues());

function Accumulator(startingValue) {
  this.value = startingValue;

  this.read = function (num) {
    this.value += num;
  }

  this.getValue = function () {
    return this.value;
  }
}

const accum = new Accumulator(3);
console.log(accum.getValue());
accum.read(18);
console.log(accum.getValue());

////////////////////////////////////////////////////////
