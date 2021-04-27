"use strict";

function test() {
  const elem = document.createElement("div");
  elem.className = "class-name";
  elem.setAttribute("id", "test");
  elem.setAttribute("name", "test-name");
}

function dataTypes() {
  // Primitive values
  const num = 23;
  console.log(typeof num); // number

  const str = "Die rotten bullen";
  console.log(typeof str); //  string

  const bool = true;
  console.log(typeof bool); // boolean

  const und = undefined;
  console.log(typeof und); // undefined

  const n = null;
  console.log(typeof n); // object (for Null because of legacy)

  const bigInt = 2n ** 53n;
  console.log("bigInt", typeof bigInt); // bigInt

  const sym = Symbol("KS");
  console.log(typeof sym); // symbol

  //  Reference values
  const arr = [];
  console.log("arr", typeof arr); // object

  const obj = {};
  console.log(typeof obj); // object

  const func = function () {
    return 4 * 4;
  };
  console.log(typeof func); // function
}
//dataTypes();

////////////////////////////////////////////////////////////////////////////////
function operators() {
  // Assignment
  // = + - * / % += -= /= ++ --
  const test1 = 12 + 10;
  test1 += 1;
  test1++;
  const test2 = ++test1;
  test1--;
  const test3 = --test1;

  const num = 10;
  if (num % 2) {
    console.log("good number");
  }

  // Comparison
  //  == === != !== > < >= <= ?
  const num1 = 50;
  if (num1 !== undefined) {
    if (100 > num1) {
      console.log("true");
    }
  }

  // Logical
  // ! && ||  ??
  // ! highest priority among logical operators, then &&, then ||
  if (!num1) {
    console.log("нет такой переменной");
  } else if (num1 > 0 && num1 < 100) {
    console.log("от 0 до 100");
  } else if (num1 === 50 || num1 === 100) {
    console.log("50 или 100");
  }

  // Operator '??' - check if null
  let firstName = null;
  let lastName = null;
  let nickName = "Pav";

  //console.log(firstName ?? lastName ?? nickName ?? "Anonimous");
}
// operators();

////////////////////////////////////////////////////////////////////////////////
// Getting elemets from document
function getEl() {
  const idEl = document.getElementById("test");
  const nameEl = document.getElementsByName("test-name");
  const classEl = document.getElementsByClassName("class-name");
  const tagEl = document.getElementsByTagName("div");
  const qryEl = document.querySelector("#test");
  const qryEls = document.querySelectorAll("div");
}

// DOM navigation:
function navDOM() {
  const act = document.activeElement.tagName;

  const prev = elem.previousElementSibling;
  const prev1 = elem.previousSibling;

  const next = elem.nextElementSibling;
  const next1 = elem.nextSibling;

  const parent = elem.parentElement;
  const parent1 = elem.parentNode;

  const children = elem.childNodes;
  const children1 = elem.children;

  const firstChild = elem.firstChild;
  const firstChild1 = elem.firstElementChild;

  const lastChild = elem.lastChild;
  const lastChild1 = elem.lastElementChild;

  elem.hasChildNodes();

  const formElems = form.elements;

  const closestElem = elem.closest(".class-name");
}

////////////////////////////////////////////////////////////////////////////////
// Coordinates in DOM
function getCoords() {
  // Element:
  //  with border & padding
  elem.offsetParent;
  elem.offsetLeft;
  elem.offsetTop;
  elem.offsetWidth;
  elem.offsetHeight;

  //  element's border
  elem.clientTop;
  elem.clientLeft;

  //  without border
  elem.clientWidth;
  elem.clientHeight;

  //  with scroll
  elem.scrollWidth;
  elem.scrollHeight;

  // scrolled part's height
  elem.scrollTop;
  // scrolled part's width
  elem.scrollLeft;

  //  The scrollIntoView() method scrolls the specified element into the visible
  //  area of the browser window.
  elem.scrollIntoView();

  // Pointer:
  //  coords without scroll for mouse (viewport)
  elem.clientX;
  elem.clientY;

  //  coords with scroll for mouse (document)
  elem.pageX;
  elem.pageY;

  //  get current element's getCoords
  const domRect = element.getBoundingClientRect();
  console.log(domRect.top);
  console.log(domRect.left);
  console.log(domRect.height);
  console.log(domRect.width);

  //  returns the pixels the current document has been scrolled from the upper left
  //  corner of the window, horizontally and vertically.
  //  The pageXOffset and pageYOffset properties are equal to the scrollX and
  //  scrollY properties.
  //  These properties are read-only.
  window.pageXOffset;
  window.pageYOffset;
  window.scrollTo(500, 0);
  window.scrollBy(100, 0);

  //  Get the current frame's height and width:
  window.innerWidth;
  window.innerHeight;
}

////////////////////////////////////////////////////////////////////////////////
// CONTENT

function editContent() {
  elem.textContent = "something";
  elem.innerHTML = "";
  elem.outerHTML = '<div class="out"><div class="add">bla-bla</div></div>';
  elem.insertAdjacentHTML("afterEnd", '<div class="new-div">Hello!</div>');
  elem.insertAdjacentElement("afterEnd", newElem);
  elem.insertAdjacentText("beforeEnd", "some new text");

  //  deprecated
  elem.nodeValue;
  elem.data;
}

//  DOM editing
function editDOM() {
  const newElem = document.createElement("div");
  elem.append(newElem);
  elem.prepend(newElem);
  elem.before(newElem);
  elem.after(newElem);
  elem.appendChild(newElem); // old method
  parent.inserBefore(newElem, elem);
  parent.removeChild(elem);
  parent.replaceChild(newElem, elem);
  parent.replaceWith(elem);
  parent.remove(elem);
  let div2 = div.cloneNode(true);

  //  Manipulate attributes, CSS
  elem.hasAttribute("id");
  elem.getAttribute("id");
  elem.setAttribute("attr", "value");
  elem.removeAttribute("attr");
  elem.attributes;
  elem.className = "super-new-class";
  div.style.cssText = `color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;
  document.body.style.background = "gray";
  elem.matches("super-new-class");
  elem.classList.contains("super-new-class");
  elem.classList.add("another-class");
  elem.classList.remove("another-class");
  elem.classList.toggle("new-class");

  let computedStyleBody = getComputedStyle(document.body);
  computedStyleBody.background;
}

////////////////////////////////////////////////////////////////////////////////
//  NUMBERS
//  In JS all the numbers are stored in 64-bit format (8B) IEEE-754 ('double precision')
//  Special numbers are Infinity, -Infinity, NaN
function numbers() {
  const newNum = 1_000_000_000.234_405;
  //  parseInt()
  let num = 2.54;
  //console.log(parseInt(num)); // 2

  //  .toFixed()
  //console.log(num.toFixed(1)); // 2.5

  //  isNaN()
  //console.log(isNaN(num)); // false

  //  parseFloat
  let elSize = "12px";
  //console.log(parseFloat(elSize)); // 12

  //  .toString()
  //console.log(num.toString(2));  // 10.10001010001111...

  //  Math.ceil
  //console.log('Math.ceil', Math.ceil(num)); // 3

  //  Math.floor
  //console.log('Math.floor', Math.floor(num)); // 2

  //  Math.round
  //console.log('Math.round', Math.round(num)); // 3

  //  Math.sqrt
  //console.log('Math.sqrt', Math.sqrt(num)); // 1.5937375...

  //  Math.pow
  //console.log('Math.pow', Math.pow(2,3)); // 8

  //  Math.random
  //console.log('Math.random', Math.random());

  //  Math.max
  //console.log('Math.max', Math.max(4,5,0,-2,15)); // 15

  //  Math.min
  //console.log('Math.min', Math.min(4,5,0,-2,15)); // -2

  // Math.sin()

  // Math.cos()
}
//numbers();

////////////////////////////////////////////////////////////////////////////////
//  STRINGS

function strings() {
  let num = 23;
  let str = "Feyenoord";
  let longStr = "Graziano Pelle";
  let arr = ["Arshavin", "Pique", "Zidan", "Petit"];

  //console.log(str[0]);

  //  .length
  //console.log(longStr.length); // 14

  //  .toString()
  //console.log(num.toString()); // '23'

  //  .split(mark)
  let newArr = longStr.split(" ");
  //console.log(newArr); // ['Graziano', 'Pelle']

  //  .replace(exp)
  let modStr = longStr.replace(/Pelle/g, "Feyenoord");
  //console.log(modStr); // 'Graziano Feyenoord'

  // .replaceAll(str)
  const strangeStr = "one+two+three";
  const normalizedStr = strangeStr.replaceAll("+", " ");

  //  .charAt(i)
  //console.log(modStr.charAt(0)); // G

  //  .charCodeAt(num)
  //console.log(modStr.charCodeAt(0)); // 71

  //  .concat(str)
  let comStr = longStr.concat(modStr);
  //console.log(comStr); // 'GrazianoPelle GrazianoFeyenoord'

  //  .slice(from, to)
  //console.log(comStr.slice(0,8)); //  'Graziano'

  //  .substr(from, amount)
  //console.log(comStr.substr(0,8)); //  'Graziano'

  //  .toUpperCase(strOrLetter)
  //console.log(comStr.toUpperCase());

  //  .toLowerCase(strOrLetter)
  //console.log(comStr.toLowerCase());

  //  .includes(str)
  let checked = longStr.includes("Graziano");
  //console.log(checked); // true

  //  .match(regEx)  returns data type - string in an array
  let res = longStr.match(/Graziano/gi);
  //console.log(res); // ['Graziano']

  // Works with regEx
  //  .exec(var) returns data type - array
  let result = /Graziano/.exec(longStr);
  //console.log(result); // ['Graziano', index:0, input: "Graziano Pelle", 'groups: undefined']

  let test;
  if ((test = /Graziano/.exec(longStr))) {
    //console.log('It is passed the test');
  }

  //  .search(regEx) returns index or -1
  let testSearch = longStr.search(/z/);
  //console.log(testSearch); // 3

  //  .localeCompare()
  //  ???

  // .indexOf(strOrSubStr)
  let res1 = longStr.indexOf("Pelle");
  //console.log(res1); // 9

  //  .eval(str)
  let nums = "3 + 2";
  //console.log(eval(nums)); // 5

  //  .trim(str)
  let someStr = " something ";
  //console.log(someStr.trim()); // 'something'
}
//strings();

// Add here cheat sheet for regEx

////////////////////////////////////////////////////////////////////////////////
//  ARRAYS
//  Create array

function arrayBasic() {
  let arr = [1, 2, 3, 4, 5]; // array literal
  let arr1 = new Array(); //  deprecated
  let arr2 = Array.from(someColl);

  let elArr = arr[0]; //  1
  let lastElArr = arr[arr.length - 1]; // 5
  let lastElArr1 = arr.slice(-1); //  5

  //  Manipulate array
  //  add to array
  arr.unshift(0); //  [0,1,2,3,4,5];
  arr[arr.length] = 6; //  [0,1,2,3,4,5,6];
  arr.push(7); // [0,1,2,3,4,5,6,7];

  //  delete from array
  arr.shift(); // [1,2,3,4,5];
  arr.pop(); // [0,1,2,3,4,5,6];

  //  reverse array
  arr.reverse(); // [6,5,4,3,2,1,0];

  //  concatinate arrays
  const comb = arr.concat(arr1);
  const comb1 = [...arr, ...arr1];
}
//arrayBasic();

// Array methods (VERY IMPORTANT)

//  Join elements of the array into the string
function arrMethods() {
  let arr = ["This", "is", "a", "string"];
  const res = arr.join("");
  console.log(res); // 'This is a string'
}
//arrMethods();

function splice() {
  let arr = ["Metallica", "Deftones", "Lady Gaga", "RATM"];
  arr.splice(2, 1);
  arr.splice(2, 1, "SOAD");
  let cutted = arr.splice(2, 1);
  console.log(arr); // ['Metallica', 'Deftones']
  console.log(cutted); // ['SOAD']
  arr.splice(0, 0, "Nirvana");
  console.log(arr); // ['nirvana', 'Metallica', 'Deftones']
}
//splice();

// Iterate array items:
function iterArr() {
  let arr = ["MC", "Arsenal", "Liverpool", "Tottenham", "St. Albans"];

  // 1 way
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }

  // 2 way
  arr.forEach((club, i) => {
    console.log(`Number ${i} is ${club}`);
  });

  // 3 way
  for (let i of arr) {
    console.log(i);
  }

  // alphabetic sort
  console.log(arr.sort());
}
//iterArr();

function forEach() {
  let arr = [1, 2, 3, 4, 5, 6];
  arr.forEach((item, i, arr) => {
    console.log(i + ": " + item + "(array: " + arr + ")");
  });
}
//forEach();

function filter() {
  let arr = [1, 2, 3, 4, 5, 6];
  const newArr = arr.filter((num) => {
    return num > 4;
  });
  console.log(newArr);
}
//filter();

function map() {
  let arr = [1, 2, 3, 4, 5, 6];
  const newArr = arr.map((el) => {
    return el * 2;
  });
  console.log(newArr);
}
//map();

function every() {
  let arr = [-1, -2, 0, 1, 2, 3, 4, 5];
  let arr1 = [-1, "2", 0, 1, false, 3, 4, 5];

  function isNum(num) {
    return typeof num === "number" && isFinite(num);
  }

  console.log(arr.every(isNum));
  console.log(arr1.every(isNum));
}
//every();

function some() {
  let arr = [-1, -2, 0, 1, 2, 3, 4, 5];
  let arr1 = [-1, "2", 0, 1, false, 3, 4, 5];

  function isNum(num) {
    return typeof num === "number" && isFinite(num);
  }

  console.log(arr.some(isNum));
  console.log(arr1.some(isNum));
}
//some();

function reduce() {
  let arr = [0, 1, 2, 3, 4, 5];

  const res = arr.reduce((prevValue, curItem, index, arr) => {
    return prevValue + " - " + curItem + " - " + index + " - " + arr + " end";
  });
  const res1 = arr.reduce((sum, current) => {
    return sum + current;
  }, 0);

  console.log(res);
  console.log(res1);
}
//reduce();

function reduceRight() {
  let arr = [0, 1, 2, 3, 4, 5];

  const res = arr.reduceRight((prevValue, curItem, index, arr) => {
    return prevValue + " - " + curItem + " - " + index + " - " + arr + " end";
  });
  const res1 = arr.reduceRight((sum, current) => {
    return sum + current;
  }, 0);
  console.log(res);
  console.log(res1);
}
//reduceRight();

function sort() {
  let arr = [10, 1, 56, 10, 33, 4, 5];
  let res = arr.sort((a, b) => {
    return a - b;
  });
  console.log(res);
}
//sort();

function find() {
  let arr = [
    {
      id: 1,
      item: "book",
    },
    {
      id: 2,
      item: "glasses",
    },
  ];
  const book = arr.find((item) => item.id === 1);
  console.log(book);
  console.log(book.item);
}
//find();

// difference between ...rest and ... (spread operator)
function restAndSpread() {
  // ...rest
  const showPerson = (name, surname, ...smthElse) => {
    console.log("name: ", name);
    console.log("surname: ", surname);
    console.log("rest:", ...smthElse);
  };
  //showPerson("Jack", "Kerouac", "The Great", "author", "!");

  // ...(spread)
  let testNums = [1, 2, 3, 4, 5, -3];
  const getMin = (arr) => {
    return Math.min(...arr);
  };
  console.log(getMin(testNums));
}
//restAndSpread();

////////////////////////////////////////////////////////////////////////////////
//  OBJECTS

function object() {
  //  Create object:

  let newObj = new Object(); // deprecated

  let newObj1 = {
    Hulk: "29",
    Arshavin: "23",
  }; //  Object literal

  let newObj2 = {
    data: {
      brands: ["509", "FXR", "Jethwear"],
      qty: [200, 400, 500],
    },
    options: {
      filter: true,
      sort: false,
    },
  };

  //  Change object value
  newObj1["Hulk"] = "7";

  //  Add new item
  newObj1.newOne = "the new";
  newObj1["Witsel"] = "28";
  newObj1["Danny"] = "10";

  //  Delete item
  delete newObj1.newOne;
  delete newObj1["Witsel"];

  //  Iterate the keys of object
  for (let item in newObj1) {
    //console.log(item);
  }

  //  Check object key
  if ("Hulk" in newObj1) {
    //console.log(newObj1['Hulk'])
  }

  //  Get object keys
  const keys = Object.keys(newObj1);
  //console.log('keys are ' + keys);

  //  Get the object values
  const values = Object.values(newObj1);
  //console.log(values);

  // Get properties as [['key': 'value'], ['key': 'value'], ...];
  const props = Object.entries(newObj1);
  //console.log(props);

  //  Freeze the object, make it immutable
  const frozen = Object.freeze(newObj1);

  const isFrozen = Object.isFrozen(newObj1);
  //console.log(isFrozen) //true

  let seal = Object.seal(newObj1);
  let isSealed = Object.isSealed(newObj1);
  //console.log(isSealed); // true

  let equal = Object.is("foo", "foo"); // true

  let newObjProto = Object.create(null);

  // shallow copy
  let copyObj = Object.assign(newObj2);
  const shallowCopy = {
    ...newObj2,
  };
  // deep copy
  const deepCopy = JSON.parse(JSON.stringify(newObj2));

  // console.log("assign copyObj", copyObj);
  // console.log("shallowCopy", shallowCopy);
  // console.log("deepCopy", deepCopy);

  // JSON
  function json() {
    const obj = {
      name: "Charles",
      age: "23",
      knoweledge: {
        language: "JavaScript",
        framework: "React",
      },
    };

    // from object to JSON
    console.log(JSON.stringify(obj));
    /// from JSON to object
    console.log(JSON.parse(JSON.stringify(obj)));
  }

  //json();

  //  ES6 OO Object
  class Test {
    constructor(name) {
      this.name = name;
    }

    getName() {
      console.log(`Name is ${this.name}`);
    }
  }

  //  new instance of ES6 class
  const test = new Test("Hulk");
  //test.getName();

  //  Class object prototyping in ES6
  class Task extends Test {
    constructor(name, date) {
      super();
      this.name = name;
      this.date = date;
    }

    getDate() {
      console.log(`Date is ${this.date}`);
    }
  }

  let nowDate = new Date();

  const task = new Task("Do JS!", nowDate);
  //task.getName();
  //task.getDate();

  //let newObj1 = Object.create({}); // create object with prototype

  //console.log(newObj1)

  function interators() {
    const range = {
      band: 1,
      established: 5,
    };

    range[Symbol.iterator] = function () {
      return {
        current: this.band,
        last: this.established,

        next() {
          if (this.current <= this.last) {
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        },
      };
    };

    for (let num of range) {
      //console.log(num);
    }
  }
  interators();
}
object();
