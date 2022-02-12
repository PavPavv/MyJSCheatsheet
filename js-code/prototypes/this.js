'use strict';

const obj = {
  word: 'Hi!',
};

// 1
function test() {
  return this;
}

// console.log(test.call(obj));
// console.log(test.apply(obj));

// 2
function test1() {
  return this.word;
}

// console.log(test1.call(obj));
// console.log(test1.apply(obj));

// 3
const complexObj = {
  x: 100,
  getX: function() {
    return this.x;
  }
};

const getXOutside = complexObj.getX;
const boundGetXOutside = getXOutside.bind(complexObj);
//console.log(boundGetXOutside());

// 4
function test2(a) {
  this.a = a;
}

const b = new test2(2);
//console.log(b.a);

// 5
function fooFighters(vocal) {
  this.dave = vocal;
}

const band = {};
const rockBand = fooFighters.bind(band);
rockBand('Grohl');
//console.log(band.dave); // 'Grohl';

const slayer = new rockBand('Lombardo');
//console.log(band.dave); // 'Grohl'
//console.log(slayer.dave); // 'Lombardo'


// 6
function fullName(name, surname) {
  this.full = name + ' ' + surname;
}

const lastname = fullName.bind(null, 'Grohl');
const name = new lastname('Dave');
//console.log(name.full)


// 7
function foo() {
	console.log( this.a );
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
//console.log(o.foo())
// console.log(foo.call(o))

// 8
function foo() {
	// возвращаем стрелочную функцию
	return (a) => {
		// Здесь `this` лексически заимствован из `foo()`
		console.log( this.a );
	};
}

var obj1 = {
	a: 2
};

var obj2 = {
	a: 3
};

var bar = foo.call( obj1 );
//console.log(bar.call( obj2 )); // 2, а не 3!

// 9
function fooo() {
	var self = this; // лексический захват `this`
	setTimeout( function(){
		console.log( self.a );
	}, 100 );
}

var obj3 = {
	a: 2
};

//console.log(fooo.call( obj3 )); // 2

// 10
function korn(adidas) {
  this.adidas = adidas;
}

const familyValues = new korn('clown');

//console.log(familyValues.adidas);

// const arr = ['foo', 'fighters', 'everlong'];
// arr.dave = 'Grohl';
// console.log(arr)

// for (let i = 0; i < arr.length; i++) {
//   console.log(arr[i])
// }