"use strict";

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

var task = {
  setId: function (id) {
    this.id = id;
  },

  outputId: function () {
    console.log(this.id);
  },
};

var xtask = Object.create(task);

xtask.prepareTask = function (id, label) {
  this.setId(id);
  this.label = label;
};

xtask.outputTask = function () {
  this.outputId();
  console.log(this.label);
};

console.log(xtask);

/////////////////////////////////////////////////////////

// es5 constructor
function Calculator() {
  this.a = 0;
  this.b = 0;

  this.read = function (num1, num2) {
    this.a = num1;
    this.b = num2;
  };

  this.sum = function () {
    return this.a + this.b;
  };

  this.mul = function () {
    return this.a * this.b;
  };

  this.getValues = function () {
    return `a is ${this.a} and b is ${this.b}`;
  };
}

const es5Calc = new Calculator();
// es5Calc.read(3,3);
// console.log(es5Calc.sum(3,3));
// console.log(es5Calc.mul(3,3));
// console.log(es5Calc.getValues());

function Accumulator(startingValue) {
  this.value = startingValue;

  this.read = function (num) {
    this.value += num;
  };

  this.getValue = function () {
    return this.value;
  };
}

const accum = new Accumulator(3);
// console.log(accum.getValue());
accum.read(18);
// console.log(accum.getValue());

////////////////////////////////////////////////////////

function CalculatArr() {
  this.methods = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
  };

  this.calculate = function (str) {
    const split = str.split(" ");
    let a = +split[0];
    let op = split[1];
    let b = +split[2];

    if (!this.methods[op] || isNaN(a) || isNaN(b)) {
      return NaN;
    }

    return this.methods[op](a, b);
  };

  this.addMethod = function (name, func) {
    this.methods[name] = func;
  };
}
const calculatArr = new CalculatArr();
// console.log(calculatArr.calculate('3 + 5'));
calculatArr.addMethod("*", (a, b) => a * b);
// console.log(calculatArr.calculate('3 * 5'));

//////////////////////////////////////////////////////////////
// Classes (fake OOP)

class Calc {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  sum() {
    if (typeof this.a === "number" || typeof this.b === "number") {
      return this.a + this.b;
    }
    return;
  }
}

const classCalc = new Calc(2, 3);
//console.log(classCalc.sum());
