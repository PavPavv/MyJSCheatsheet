"use strict";

//  1
const obj = {
  movie: "Interstellar",
};

const obj1 = {};
obj1.__proto__ = obj;

//console.log(obj1.movie);

//  2
const objA = {
  movie: "Interstellar",
};

const objA1 = Object.create(objA);

//console.log(obj1.movie);

//  3
const objB = {
  movie: "Interstellar",
};

const objB1 = {};
objB1.prototype = objB;

//console.log(obj1.movie);

/////////////////////////////////////////////////////
//  1
function Foo(who) {
  this.me = who;
}
Foo.prototype.identify = function () {
  return "I am " + this.me;
};

function Bar(who) {
  Foo.call(this, who);
}
Bar.prototype = Object.create(Foo.prototype);

Bar.prototype.speak = function () {
  console.log("Hello, " + this.identify() + ".");
};

var b1 = new Bar("b1");
var b2 = new Bar("b2");

b1.speak();
b2.speak();

//  2
var Foo1 = {
  init: function (who) {
    this.me = who;
  },
  identify: function () {
    return "I am " + this.me;
  },
};

var Bar1 = Object.create(Foo1);

Bar1.speak = function () {
  console.log("Hello, " + this.identify() + ".");
};

var bb1 = Object.create(Bar1);
bb1.init("bb1");
var bb2 = Object.create(Bar1);
bb2.init("bb2");

bb1.speak();
bb2.speak();
