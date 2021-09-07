"use strict";

//  1
const obj = {
  movie: 'Interstellar',
};

const obj1 = {};
obj1.__proto__ = obj;

console.log(obj1.movie)


//  2
const objA = {
  movie: 'Interstellar',
};

const objA1 = Object.create(objA);

console.log(obj1.movie)


//  3
const objB = {
  movie: 'Interstellar',
};

const objB1 = {};
objB1.prototype = objB;

console.log(obj1.movie)


/////////////////////////////////////////////////////




