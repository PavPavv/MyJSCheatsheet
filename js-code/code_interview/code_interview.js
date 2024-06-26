const now = require('performance-now');

const funcSpeed = (func) => {
  const start = now();

  for (let i = 0; i < 10000000; i++) {
    func;
  }

  const end = now();
  const result = end - start;
  return `${result.toFixed(2)} ms`;
};

// 1
/*
  Example:
  counter(); // 1
  counter(); // 2
  counter(); // 3
  ...
*/

const count = (num) => {
  let counter = num || 0;
  return () => counter++;
};

const counter1 = count();
const counter2 = count(21);

// counter1();
// counter1();
// counter1();
// console.log(counter1())

// counter2(1);
// counter2(1000);
// counter2();
// console.log(counter2())
//////////////////////////////////////////////////////////////////

// 2
const queues = () => {
  // 0 текущий контекст вызова - это МАКРОзадача 1

  // 4 МАКРОзадача крайняя, т.к. по умолчанию у любого setTimeout мин задержка 4мс
  setTimeout(() => {
    console.log('setTimeout');
  }, 0);

  // 1 микрозадача текущего контекста вызова
  let p = new Promise((resolve, reject) => {
    console.log('create promise');
    resolve();
  });

  // 3 микрозадача второй макрозадачи
  p.then(() => {
    console.log('handling promise');
  });

  // 2 следующая МАКРОзадача 2
  console.log('clg');
};

// create promise -> clg -> handling promise -> setTimeout
//queues();
//////////////////////////////////////////////////////////////////

// 3
//    (bad description -> bad solutions)
/**
 * @param {string} j
 * @param {string} s
 * @return {number}
 * func('cool', 'location') ->  ???
 */
const stonesAndJewels = () => {
  const j = 'cool';
  const s = 'location';

  const amountOfCommonLetter = (str1, str2) => {
    let counter = 0;
    let set = new Set();

    for (let ltr of str1) {
      set.add(ltr);
    }

    for (let ltr of str2) {
      if (set.has(ltr)) {
        counter++;
      }
    }

    return counter;
  };
  //console.log('answer', amountOfCommonLetter(j, s));

  const amountOfCommonLetter1 = (str1, str2) => {
    let set = new Set(str1);
    return [...str2].reduce((ac, s) => set.has(s) + ac, 0);
  };
  //console.log(amountOfCommonLetter1(j, s));

  const amountOfCommonLetter2 = (str1, str2) => {
    let counter = 0;
    let set = {};

    for (let i = 0; i < str1.length; i++) {
      set[str1[i]] = 1;
    }

    for (let i = 0; i < str2.length; i++) {
      counter += set[str2[i]] || 0;
    }

    return counter;
  };
  //console.log(amountOfCommonLetter2(j, s));

  const amountOfCommonLetter3 = (str1, str2) =>
    str2.replace(new RegExp(`[^${str1}]`, 'g'), '').length;

  //console.log("amountOfCommonLetter3", amountOfCommonLetter3(j, s));

  // console.log('amountOfCommonLetter', funcSpeed(amountOfCommonLetter(j, s)));   // 4
  // console.log('amountOfCommonLetter1', funcSpeed(amountOfCommonLetter1(j, s))); // 3
  // console.log('amountOfCommonLetter2', funcSpeed(amountOfCommonLetter2(j, s))); // 2
  // console.log('amountOfCommonLetter3', funcSpeed(amountOfCommonLetter3(j, s))); // 1
};
//stonesAndJewels();
//////////////////////////////////////////////////////////////////////
[100, 10, 2, 4, 3, 5, -1];
// 4
const stonesAndJewelsPrecise = () => {
  /**
   * @param {string} J
   * @param {string} S
   * @return {number} amount of unique symbols
   * func('cool', 'location') ->  ???
   */
  const amountOfCommonLetter = (str1, str2) => {
    let counter = 0;
    let set = new Set([...str1]);
    let uniqueStr2 = new Set([...str2]);

    for (let ltr of uniqueStr2) {
      if (set.has(ltr)) {
        counter++;
      }
    }

    return counter;
  };
  console.log('amountOfCommonLetter', amountOfCommonLetter('cool', 'location'));
  console.log(
    'amountOfCommonLetter',
    funcSpeed(amountOfCommonLetter('cool', 'location')),
  );
};
//stonesAndJewelsPrecise();
/////////////////////////////////////////////////////////////////////

// 5
/**
 * 0, 1,1,2,3,5,8,13,21,34,55,89,144
 * @param {number} num
 * @return {number}
 * func(9) => 34
 * fibonacci = 0, 1, 1, (current - 1) + (current - 2)...
 */
const fibonacci = (num) => {
  if (num < 2) {
    return num;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
};

const fibonacci1 = (num) => {
  return num < 2 ? num : fibonacci1(num - 1) + fibonacci1(num - 2);
};

const fibonacciFast = (num) => {
  const result = [0, 1];

  for (let i = 2; i <= num; i++) {
    let prev1 = result[i - 1];
    let prev2 = result[i - 2];
    result.push(prev1 + prev2);
  }

  return result[num];
};
//console.log("fib", fibonacciFast(7));

const findFib = (num) => {
  let result = [0, 1];

  for (let i = 2; i <= num; i++) {
    let prev1 = result[i - 1];
    let prev2 = result[i - 2];
    result.push(prev1 + prev2);
  }
  //  prevent storing the array with all the numbers before target number
  result = [result[num]]; //  [number]
  return result[0]; //  number
};

//console.log(findFib(100));

//console.log("fibonacci", funcSpeed(fibonacci(9))); // 3
//console.log("fibonacci1", funcSpeed(fibonacci1(9))); // 2
//console.log("fibonacciFast", funcSpeed(fibonacciFast(9))); // 1 (without recursion it is super fast)

const fib3 = (function () {
  const seq = [1, 1]; // ??

  return function (num) {
    // ??
    console.log('called with', num);
    if (seq.length >= num) {
      console.log('no compute');
      return seq.slice(0, num);
    }

    for (let i = 2; i < num; i++) {
      const last = seq[seq.length - 1];
      const prev = seq[seq.length - 2];
      seq.push(last + prev);
      console.log('Pushed', seq[seq.length - 1]);
    }
    return seq;
  };
})();

// console.log(fib3(1));
// console.log(fib3(9));
// console.log(fib3(8));
// console.log(fib3(12));

/////////////////////////////////////////////////////////////////////////

// 6
/*
palindrome('anna') -> true
palindrome('table') -> false
*/
const palindrome = (str) => {
  str = str.toLowerCase();
  return str === str.split('').reverse().join('');
};

const isReversed = (source, test) => {
  return (source + source).includes(test) && source.length === test.length;
};
console.log(isReversed('foo', 'oof'));
console.log(isReversed('test', 'text'));
// console.log(palindrome('aka'));
// console.log(palindrome('bu'));
// console.log(palindrome('buy'));
/////////////////////////////////////////////////////////////////////////

// 7
/*
fizzbuzz(5) -> 1 2 'fizz' 4 'buzz'
*/
const fizzbuzz = (n) => {
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log('fizzbuzz');
    } else if (i % 3 === 0) {
      console.log('fizz');
    } else if (i % 5 === 0) {
      console.log('buzz');
    } else {
      console.log(i);
    }
  }
};
// fizzbuzz(5);
// fizzbuzz(12);
// fizzbuzz(15);

const fizzbuzz1 = (n) => {
  for (let i = 1; i <= n; i++) {
    console.log(
      (i % 3 === 0 && i % 5 === 0 && 'fizzbuzz') ||
        (i % 3 === 0 && 'fizz') ||
        (i % 5 === 0 && 'buzz') ||
        i,
    );
  }
};
// fizzbuzz1(5)
// fizzbuzz1(12)
// fizzbuzz1(15)
/////////////////////////////////////////////////////////////////////////

//  8
/**
@param {string}
@return {number}
findVowels('anna') -> 2
*/
const findVowels = (str) => {
  let matched = str.match(/[aeiou]/gi);
  return matched ? matched.length : 0;
};
//console.log(findVowels('anna'));

const findVowels1 = (s) => {
  const VOWELS = ['a', 'o', 'u', 'e', 'i'];
  let counter = 0;
  for (let i = 0; i < s.length; i++) {
    if (VOWELS.includes(s[i])) counter++;
  }
  return counter;
};
console.log(findVowels1('wolf'));
console.log(findVowels1('samara'));
/////////////////////////////////////////////////////////////////////////

// 9
/**
  @param {string}
  @param {string}
  @return {boolean}
  anagram('finder', 'friend') -> true
  anagram('find', 'friend') -> false
*/
const buildCharObj = (str) => {
  const charObj = {};
  for (let char of str.replace(/[^\w]/g).toLowerCase()) {
    charObj[char] = charObj[char] + 1 || 1;
  }
  return charObj;
};
//console.log(buildCharObj('test'))

const anagram = (strA, strB) => {
  const aCharObj = buildCharObj(strA);
  const bCharObj = buildCharObj(strB);

  if (Object.keys(aCharObj).length !== Object.keys(bCharObj).length) {
    return false;
  }

  for (let char in aCharObj) {
    if (aCharObj[char] !== bCharObj[char]) {
      return false;
    }
  }

  return true;
};
//console.log(anagram('finder', 'friend'))

const strEqualize = (str) => {
  return str.replace(/[^\w]/g).toLowerCase().split('').sort().join('');
};

const anagram1 = (str1, str2) => {
  if (str1.length !== str2.length) return false;

  return strEqualize(str1) === strEqualize(str2);
};
//console.log(anagram1('era', 'ear'));

//console.log('anagram', funcSpeed(anagram('finder', 'friend')));
//console.log('anagram1', funcSpeed(anagram1('finder', 'friend')));
////////////////////////////////////////////////////////////

// 10
/**
 * @param {number[]} numsArr
 * @param {number} target
 * @return {number[]}
 * func([2,7,11,15], 9) -> [2,7];
 */
const findNumsOfSum = (arr, target) => {
  let result = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        result.push([arr[i], arr[j]]);
      }
    }
  }

  return result;
};

//  more simple tests from real interview
const twoSum = (arr, target) => {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        result.push(i, j);
      }
    }
  }

  return result;
};
// console.log(twoSum([2, 1, 0, 4, 100, 5, 23], 9));
// console.log("twoSum", funcSpeed(twoSum([2, 1, 0, 4, 100, 5, 23], 9))); //

const twoSum1 = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return [i, j];
      }
    }
  }
};
// console.log(twoSum1([2, 1, 0, 4, 100, 5, 23], 9));
// console.log("twoSum1", funcSpeed(twoSum1([2, 1, 0, 4, 100, 5, 23], 9))); //

//////////////////////////////////////////////////////////////////////

// 11
/**
 * @param {number} x
 * @return {number}
 * func(123) -> 321
 */
const reverseInt = (int) => {
  const LIMIT = 2_147_483_648;
  const k = int < 0 ? -1 : 1;
  const n = parseInt(Math.abs(int).toString().split('').reverse().join(''));
  return n > LIMIT ? 0 : n * k;
};
//console.log(reverseInt(123))
////////////////////////////////////////////////////////////////////////

// 12
/**
 * @param {number} x
 * @return {boolean}
 * func(121) -> true
 */
const middlePalindrome = (x) => {
  const str = x.toString();

  for (let i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }
  return true;
};
// console.log(middlePalindrome(2332));
// console.log(middlePalindrome('Anna'));
// console.log(middlePalindrome('Flag'));
// console.log(middlePalindrome(1233));
////////////////////////////////////////////////////////////////////////

// 13
/**
 * @param {string[]} strs
 * @return {string}
 * func(['strs', 'string']) -> 'str'
 */
const longestComPrfx = (strArr) => {
  if (strArr.length < 2 || typeof strArr[0] !== 'string') return '';
  const lowerArr = strArr.map((str) => str.toLowerCase());

  let prefix = '';
  let candidateChar;
  let firstWord = lowerArr.shift();
  let i = 0;

  while (firstWord && i <= firstWord.length) {
    candidateChar = firstWord[i] || '';
    for (let word of lowerArr) {
      if (candidateChar !== word[i]) {
        return prefix;
      }
    }
    prefix += candidateChar;
    i++;
  }
  return prefix;
};
//console.log(longestComPrfx(["flower", "flow", "flight"]));
//////////////////////////////////////////////////////////////////////

// 14
const varTest = () => {
  let a = 1;
  let b = 1;
  let c = ++a;
  let d = b++;
  return `${a} | ${b} | ${c} | ${d}`;
};
console.log(varTest());

// 15
const varTest1 = () => {
  let a = 2;
  let x = 1 + (a *= 2);
  return `${a} | ${x}`;
};
//console.log(varTest1());

const valTest = () => {
  let a = '' + 1 + 0; // "10"
  let b = '' - 1 + 0; // -1
  let c = true + false; // 1
  let d = 6 / '3'; // 2
  let e = '2' * '3'; // 6
  let f = 4 + 5 + 'px'; // "9px"
  let g = '$' + 4 + 5; // "$45"
  let h = '4' - 2; // 2
  let i = '4px' - 2; // NaN
  let j = 7 / 0; // Infinity
  let k = '  -9  ' + 5; // " -9 5"
  let l = '  -9  ' - 5; // -14
  let m = null + 1; // 1
  let n = undefined + 1; // NaN
  let o = ' \t \n' - 2; // -2

  return `${a} | ${b} | ${c} | ${d} | ${e} | ${f} | ${g} | ${h} | ${i} | ${j} | ${k} | ${l} | ${m} | ${n} | ${o}`;
};
//console.log(valTest());

const valTest1 = () => {
  let a = 5 > 4; // true
  let b = 'ананас' > 'яблоко'; // false
  let c = '2' > '12'; // true
  let d = undefined == null; // true
  let e = undefined === null; // false
  let f = null == '\n0\n'; // false
  let g = null === +'\n0\n'; // false

  return `${a} | ${b} | ${c} | ${d} | ${e} | ${f} | ${g}`;
};
//console.log(valTest1());

const valTest2 = () => {
  let a = null || 2 || undefined; // 2
  let b = 1 && null && 2; // null
  let c = null || (2 && 3) || 4; // 3
  let d = Boolean(-1 || 0); // -1 -> true
  let e = Boolean(-1 && 0); // false
  let f = Boolean(null || (-1 && 1)); // true

  return `${a} | ${b} | ${c} | ${d} | ${e} | ${f}`;
};
//console.log(valTest2())
//////////////////////////////////////////////////////////////////

// 16
const loops = () => {
  for (let i = 0; i < 3; i++) {
    //console.log(`number ${i}!`);
  }

  let i = 0;
  while (i < 3) {
    //console.log(`number ${i}!`);
    i++;
  }
};
loops();
/////////////////////////////////////////////////////////////////

// 17
/**
 * @param {number} int
 * @return {number[]}
 * func(10) -> [2,3,5,7];
 */
const allPrimeNumsFromTo = (int) => {
  let result = [];

  nextPrime: for (let i = 2; i <= parseInt(int); i++) {
    for (let j = 2; j < i; j++) {
      if (i % j === 0) continue nextPrime;
    }

    result.push(i);
  }
  return result;
};
//console.log(allPrimeNumsFromTo(10));
//////////////////////////////////////////////////////////////////

// 18
/**
 * @param {number[]} numArr
 * @return {number[]}
 * func([1,0,-5]) -> [-5, 0, 1]
 */
const bubbleArr = [10, 3, -5, 0];

const bubbleSort = (numArr) => {
  if (!numArr) {
    console.log('Нет данных');
    return;
  }

  for (let i = 0; i < numArr.length; i++) {
    for (let j = 0; j < numArr.length - i - 1; j++) {
      if (numArr[j] > numArr[j + 1]) {
        const leftHand = numArr[j];
        numArr[j] = numArr[j + 1];
        numArr[j + 1] = leftHand;
      }
    }
  }

  return numArr;
};

const newBubbleArr = bubbleSort(bubbleArr);

// console.log('bubbleArr', bubbleArr)
// console.log('newBubbleArr', newBubbleArr);
////////////////////////////////////////////////////////////////

// 19
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 * func(2,1) -> 1
 */

const min = (a, b) => {
  return Math.min(a, b);
};

const min1 = (a, b) => {
  return a < b ? a : b;
};

// console.log(min(10, 5));
// console.log(min1(10, 5));

// console.log(funcSpeed(min(2, 1)));
// console.log(funcSpeed(min1(2, 1)));

// 20
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 * func(2,3) -> 8
 */
const pow = (x, n) => {
  return Math.pow(x, n);
};
//console.log('pow', pow(2, 3));

const pow1 = (x, n) => {
  let i = 1;
  let basic = x;
  while (i < n) {
    x *= basic;
    i++;
  }
  return x;
};
//console.log('pow1', pow1(2, 3));

const pow2 = (x, n) => {
  let result = x;
  for (let i = 1; i < n; i++) {
    result *= x;
  }
  return result;
};
//console.log('pow2', pow2(2, 3));

// console.log('pow', funcSpeed(pow(2, 3)));
// console.log('pow1', funcSpeed(pow1(2, 3)));
// console.log('pow2', funcSpeed(pow2(2, 3)));
//////////////////////////////////////////////////////////////////////

// 21
/**
 * @param {string} str
 * @return {object}
 * func('aaba') -> {a: 3, b : 1}
 */
const countSameLetters = (str) => {
  let obj = {};

  for (let letter of str) {
    if (!obj[letter]) {
      obj[letter] = 1;
    } else {
      obj[letter] += 1;
    }
  }

  return obj;
};
//console.log(countSameLetters('aaba'));

const countSameLetters1 = (str) => {
  return [...str].reduce((a, e) => {
    a[e] = a[e] ? a[e] + 1 : 1;
    return a;
  }, {});
};
//console.log(countSameLetters1('aaba'));

const countSameLetters2 = (str) => {
  return [...str].reduce(
    (res, char) => ((res[char] = (res[char] || 0) + 1), res),
    {},
  );
};
//console.log(countSameLetters2('aaba'));

const countSameLetters3 = (str) => {
  const obj = {};

  str.replace(
    /\S/g,
    (letter) => (obj[letter] = isNaN(obj[letter]) ? 1 : obj[letter] + 1),
  );
  return obj;
};
//console.log(countSameLetters3('aaba'));

const countSameLetters4 = (str) => {
  const charObj = {};
  for (let char of str.replace(/[^\w]/g).toLowerCase()) {
    charObj[char] = charObj[char] + 1 || 1;
  }
  return charObj;
};

const buildCharObj1 = (str) => {
  const charObj = {};
  for (let char of str.replace(/[^\w]/g).toLowerCase()) {
    charObj[char] = charObj[char] + 1 || 1;
  }
  return charObj;
};
//console.log(buildCharObj1('test'))

// console.log('countSameLetters', funcSpeed(countSameLetters('aabacvvccccvcbx')));
// console.log('countSameLetters1', funcSpeed(countSameLetters1('aabacvvccccvcbx')));
// console.log('countSameLetters2', funcSpeed(countSameLetters2('aabacvvccccvcbx')));
// console.log('countSameLetters3', funcSpeed(countSameLetters3('aabacvvccccvcbx')));
// console.log('countSameLetters4', funcSpeed(countSameLetters4('aabacvvccccvcbx')));
//////////////////////////////////////////////////////////////////////////////////////////////

// 22
/**
 * @param {object} obj
 * @return {boolean}
 * func({}) -> true
 */
const isEmptyObj = (obj) => {
  return Object.keys(obj).length ? false : true;
};
//console.log(isEmptyObj({}));

const isEmptyObj1 = (obj) => {
  for (let key in obj) {
    return false;
  }
  return true;
};
//console.log(isEmptyObj1({ a: 1, }));

// console.log('isEmptyObj', funcSpeed(isEmptyObj({ a: 1, b: 2, c: 3 })));
// console.log('isEmptyObj1', funcSpeed(isEmptyObj1({ a: 1, b: 2, c: 3 })));
/////////////////////////////////////////////////////////////////////////////////////////////

// 23
/**
 * @param {object} obj
 * @return {number}
 * func(salary: object) -> 1000000;
 */
const salaries = {
  john: 100,
  ann: 100,
  pete: 300,
};

const getObjNumValues = (obj) => {
  return Array.from(Object.values(obj)).reduce((a, b) => a + b, 0);
};
//console.log(getObjNumValues(salaries));

const getObjNumValues1 = (obj) => {
  let sum = 0;
  for (let key in obj) {
    sum += obj[key];
  }
  return sum;
};
//console.log(getObjNumValues1(salaries));
// console.log('getObjNumValues', funcSpeed(getObjNumValues(salaries)));
// console.log('getObjNumValues1', funcSpeed(getObjNumValues1(salaries)));
/////////////////////////////////////////////////////////////////////////////////

// 24
/**
 * @param {object} obj
 * @return {object}
 * const newObj = func(obj);
 */
let menu = {
  width: 200,
  height: 300,
  title: 'My menu',
};
const multiplyNumeric = (obj) => {
  for (key in obj) {
    if (typeof obj[key] === 'number') {
      obj[key] *= 2;
    }
  }
};
multiplyNumeric(menu);
// console.log(menu);
///////////////////////////////////////////////////////////////////////////////

// 25
let ladder = {
  step: 0,

  up() {
    this.step++;
    return this;
  },

  down() {
    this.step--;
    return this;
  },

  showStep() {
    console.log(this.step);
    return this;
  },
};

// ladder.showStep();
// ladder.up().up();
// ladder.showStep();
/////////////////////////////////////////////////////////////////////////////

// 26
/**
 * @param {string} str
 * @param {number} max
 * @return {string}
 * func('Such a long word', 7) -> 'Such a ...'
 */

const truncate = (str, max) => {
  if (str.length > max) {
    const newStr = str.slice(0, max);
    return newStr + '...';
  }

  return str;
};
//console.log(truncate('You are so cool, you are so Rock\'n\'Roll', 10));

const truncate1 = (str, max) => {
  return str.length > max ? str.slice(0, max - 1) + '...' : str;
};
//console.log(truncate1('You are so cool, you are so Rock\'n\'Roll', 10));

// console.log('getObjNumValues', funcSpeed(truncate('You are so cool, you are so Rock\'n\'Roll', 10)));
// console.log('getObjNumValues1', funcSpeed(truncate1('You are so cool, you are so Rock\'n\'Roll', 10)));
//////////////////////////////////////////////////////////////////////////////////////////////////////////

//27
/**
 * @param {string} value
 * @return {number}
 * func('100р') -> 100;
 * func('$100') -> 100;
 */

const extractNumber = (value) => {
  return value
    .split('')
    .map((s) => s - 0)
    .filter((s) => isNaN(s) !== true)
    .join('');
};

// console.log(extractNumber('$100'));
// console.log(extractNumber('200р'));
// console.log(extractNumber('sdfsdf200dsfg'));

const extractNumber1 = (value) => {
  const result = [];

  for (let s of value) {
    let elem = s - 0;
    if (!isNaN(elem)) {
      result.push(elem);
    }
  }
  return result.join('');
};

// console.log(extractNumber1('$100'));
// console.log(extractNumber1('200р'));
// console.log(extractNumber1('sdfsdf200dsfg'));

// console.log('getObjNumValues', funcSpeed(extractNumber('sdfsdf200dsfg')));
// console.log('getObjNumValues1', funcSpeed(extractNumber1('sdfsdf200dsfg')));
///////////////////////////////////////////////////////////////////////////////////////

// 28
/**
 * @param {string} str
 * @return {string}
 * func('AABCEEEDDCAAYYY') -> 'A2B1C1E3D2Y3';
 */

const numberifyStr = (str) => {
  let obj = {};
  let prevLetter = '';

  str.split('').forEach((letter) => {
    if (letter === prevLetter) {
      obj[letter]++;
    } else {
      prevLetter = letter;
      obj[letter] = 1;
    }
  });

  const result = [];
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    result.push(`${key}${obj[key]}`);
  });

  return result.join('');
};
// console.log(numberifyStr('AABCEEEDDCAAYYY'));
// console.log('numberifyStr', funcSpeed(numberifyStr('AABCEEEDDCAAYYY')));

function rle(s) {
  const obj = {};
  let result = '';

  for (let i = 0; i < s.length; i++) {
    obj[s[i]] = obj[s[i]] ? obj[s[i]] + 1 : 1;
  }

  for (const char in obj) {
    result += `${char}${obj[char]}`;
  }
  return result;
  // return Object.entries(obj).map(x => x.join('')).join('');
}
// console.log(rle('AAABBCDDDDEEEEEFFGGG'));
///////////////////////////////////////////////////////////////////////////////////////

// 29
/**
 * @param {string} str
 * @return {string}
 * func('AABCEEEDDCAAYYY') -> 'A2B1C1E3D2C1A2Y3';
 */
const numberifyStrWithReapeat = (str) => {
  return str.split('').reduce(
    (acc, str, i, arr) => {
      if (str === arr[i + 1]) {
        acc.count += 1;
      } else {
        acc.result += `${str}${acc.count + 1}`;
        acc.count = 0;
      }

      return acc;
    },
    { result: '', count: 0 },
  ).result;
};
//console.log(numberifyStrWithReapeat('AABCEEEDDCAAYYY'));

const numberifyStrWithReapeat1 = (str) => {
  return str.replace(/([A-Z])(\1*)?/g, (x) => {
    return `${x.charAt(0)}${x.length}`;
  });
};
//console.log(numberifyStrWithReapeat1('AABCEEEDDCAAYYY'));
////////////////////////////////////////////////////////////////////////////////////////

// 30
/**
 * @param {string} str
 * @return {string}
 * func('AABCEEEDDCAAYYY') -> 'A4B1C2E3D2Y3';
 */

const numberifyStrTillEnd = (str) => {
  const obj = {};
  const result = [];

  for (let letter of str) {
    if (obj[letter]) {
      obj[letter] += 1;
    } else {
      obj[letter] = 1;
    }
  }

  Object.keys(obj).forEach((key) => result.push(`${key}${obj[key]}`));
  return result.join('');
};
// console.log(numberifyStrTillEnd('AABCEEEDDCAAYYY'));

const numberifyStrTillEnd1 = (str) => {
  const obj = {};
  const result = [];
  str.replace(/\S/g, (letter) => {
    obj[letter] = isNaN(obj[letter]) ? 1 : obj[letter] + 1;
  });

  for (const key in obj) {
    result.push(`${key}${obj[key]}`);
  }
  return result.join('');
};
// console.log(numberifyStrTillEnd1('AABCEEEDDCAAYYY'));

function numberifyStrTillEnd2(str) {
  function pack(s, charCounter) {
    if (charCounter > 1) {
      return `${s}${charCounter}`;
    }
    return s;
  }

  let lastChar = str[0];
  let lastPos = 0;
  let result = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== lastChar) {
      result.push(pack(lastChar, i - lastPos));
      lastPos = i;
      lastChar = str[i];
    }
  }

  result.push(pack(str[lastPos], str.length - lastPos));

  return result.join('');
}
// console.log(numberifyStrTillEnd2('AABCEEEDDCAAYYY'));
//
// console.log('numberifyStrTillEnd', funcSpeed(numberifyStrTillEnd('AABCEEEDDCAAYYY')));
// console.log('numberifyStrTillEnd1', funcSpeed(numberifyStrTillEnd1('AABCEEEDDCAAYYY')));
// console.log('numberifyStrTillEnd2', funcSpeed(numberifyStrTillEnd2('AABCEEEDDCAAYYY')));
///////////////////////////////////////////////////////////////////////////////////////////

// 31
/**
 * @param {number} from
 * @param {number} to
 * @return {number}
 * func(3,9) -> 5;
 */
const randomNumber = (min, max) => {
  return parseInt(min + Math.random() * (max - min));
};
// console.log(randomNumber(3, 9));

// 32
class UserTest1 {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(this.name);
  }
}

const userT1 = new UserTest1('Malcom');
const { sayHello } = userT1;

//userT1.sayHello(); // 'Malcom'
//sayHello(); // "TypeError: Cannot read property 'name' of undefined"
/////////////////////////////////////////////////////////////////////////

// 33
/**
 * @param {string} str
 * @return {object}
 * func('a.b.d.e') -> { a: { b: { d: { e: {} } } } }
 */
// const strToDeepObj = (str, divider) => {
//   const obj = {};
//   let tmp = obj;
//   const arr = str.split(divider);
//   console.log(arr)

//   for (let i = 0; i < arr.length; i++) {
//     let key = arr[i];
//     console.log('key', key)
//     let value = (key === undefined) ? '' : {};
//     console.log('tmp[key]', tmp[key]);
//     tmp[key] = tmp[key] || value;
//     console.log('tmp[key]', tmp[key]);
//     tmp = tmp[key];

//   }
//   return obj;
// };
// console.log(strToDeepObj('a.b.d.e', '.'));

const strToDeepObj1 = (str, divider) => {
  let obj = {};
  const arr = str.split(divider);

  for (let i = 0; i < arr.length; i++) {
    let key = arr[i];

    obj[key] = {
      key: obj[arr[i + 1]],
    };
  }
  return obj;
};

//console.log(strToDeepObj1('a.b.d.e', '.'));
//////////////////////////////////////////////////////////

// 34
/**
 * @param {array} arr
 * @return {array}
 * func (["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"]) -> ["nap,teachers,ear" or "PAN,cheaters,era"];
 */

const anagramFree = () => {};

//  35
/**
 *  @param {object} root
 *  @return {number}
 * func(root) -> 15
 */

const binaryTree = {
  value: 1,

  right: {
    value: 3,
    right: {
      value: 6,
      right: {
        value: 8,
        right: null,
        left: null,
      },
      left: null,
    },
    left: null,
  },

  left: {
    value: 2,
    right: {
      value: 5,
      left: null,
      right: null,
    },
    left: {
      value: 4,
      right: null,
      left: {
        value: 7,
        right: null,
        left: null,
      },
    },
  },
};

const findDeepestLeavesSum = (root) => {
  let maxDepth = 0;
  const obj = {};

  const inspectObj = (node, currentDepth = 1) => {
    const { value, left, right } = node;

    if (left) inspectObj(left, currentDepth + 1);
    if (right) inspectObj(right, currentDepth + 1);

    if (!left && !right) {
      if (currentDepth > maxDepth) maxDepth = currentDepth;
      const currentSum = obj[currentDepth] ? obj[currentDepth] : 0;
      obj[currentDepth] = currentSum + value;
    }
  };

  inspectObj(root);

  return obj[maxDepth];
};

//console.log(findDeepestLeavesSum(binaryTree));

//////////////////////////////////////////////////////////////
//  36

/**
 * @param {number[]} strArr
 * @return {string}
 */
function getLongestCommonPrefix(strArr) {
  if (strArr.length < 2) return '';

  for (let str of strArr) {
    if (typeof str !== 'string') {
      return '';
    }
  }

  const lowerArr = strArr.map((item) => item.toLowerCase());

  let prefix = '';
  let candidateChar;
  let firstWord = lowerArr.shift();
  let i = 0;

  while (i <= firstWord.length) {
    candidateChar = firstWord[i] || '';

    for (let word of lowerArr) {
      if (candidateChar !== word[i]) {
        return prefix;
      }
    }

    prefix += candidateChar;
    i++;
  }

  return prefix;
}
//console.log(getLongestCommonPrefix(['flower', 'flow', 'flight']));

///////////////////////////////////////////////////////////////////////////
//  37
function getLongestCommonPattern(strArr) {
  //  standard check
  if (strArr.length < 2) return '';

  for (let str of strArr) {
    if (typeof str !== 'string') {
      return '';
    }
  }

  const lowerArr = strArr.map((item) => item.toLowerCase());
  let commonPart = '';
  const firstWord = lowerArr[0];
  let t = '';

  for (let i = 1; i < lowerArr.length; i++) {
    let testWord = lowerArr[i];
    if (testWord) {
    }
  }

  return commonPart;
}
//console.log(getLongestCommonPattern(['quflower', 'qiflow', 'sportflowlight']));

////////////////////////////////////////////////////////////////////////////////
//  38
/**
 * @param {number}
 * @return {number}
 * func(3) -> 6 (1 + 2 + 3)
 */

function sumToLoop(n) {
  let result = 0;

  for (let i = 1; i <= n; i++) {
    result += i;
  }

  return result;
}
// console.log(sumToLoop(3))
// console.log(sumToLoop(4))
// console.log(sumToLoop(100))

function sumToRec(n) {
  if (n === 1) {
    return n;
  } else {
    return n + sumToRec(n - 1);
  }
}
// console.log(sumToRec(3));
// console.log(sumToRec(4));
// console.log(sumToRec(100));

function sumToProgression(n) {
  return (n * (n + 1)) / 2;
}
// console.log(sumToProgression(3))
// console.log(sumToProgression(4))
// console.log(sumToProgression(100))

////////////////////////////////////////////////////////////////////////////////
//  39
/**
 * @param {number}
 * @return {number}
 * func(4) -> 24 (4 * 3 * 2 * 1)
 */
function factorial(n) {}
// console.log(factorial(3));
// console.log(factorial(4));
// console.log(factorial(5));

//////////////////////////////////////////////////////////////////
//  40
/**
 * @param {string}
 * @return {number}
 * func("( [ <> () ] <> )") -> 1
 */

function verify(string) {
  const temp = [];

  const targets = {
    open: ['(', '[', '<'],
    close: [')', ']', '>'],
  };
  const stringArray = string.split('');

  //  check even number of target symbols
  for (let i = 0; i < stringArray.length; i++) {
    const elem = stringArray[i];
    //  check for target's opening symbols
    if (targets.open.includes(elem)) {
      temp.push(elem); //  if so add them to the temp array

      //  check for target's closing symbols
    } else if (targets.close.includes(elem)) {
      // find its opening pair in the target's static object
      const openPair = targets.open[targets.close.indexOf(elem)];
      // check if that pair is the last element in the array
      if (temp[temp.length - 1] === openPair) {
        temp.splice(-1, 1); // if so, remove it
      } else {
        temp.push(elem);
        // break;
      }
    }
  }

  let isCorrect = temp.length === 0;
  return isCorrect ? 1 : 0;
}

// console.log(verify("---(++++)----")) //  1
// console.log(verify(""))  //  1
// console.log(verify("before ( middle []) after "))  //  1

// console.log(verify(")("))  //  0
// console.log(verify("<( >)")) //  0

// console.log(verify("( [ <> () ] <> )")) // 1
// console.log(verify(" (    [)"))  //  0

//////////////////////////////////////////////////////////////
//  41
//  Task: optimise and short the 'badFunc' whish is doing following:
//  return max value out of two chars (a, b) from a string (s)
/**
 * @param {string}
 * @param {string}
 * @param {string}
 * @return {number}
 * func('google', 'g', 'o') -> 3
 */

function badFunc(s, a, b) {
  var match_empty = /^$/;
  if (s.match(match_empty)) {
    return -1;
  } else {
    var i = s.length - 1;
    var aIndex = -1;
    var bIndex = -1;

    while (aIndex == -1 && bIndex == -1 && i >= 0) {
      if (s.substring(i, i + 1) == a) {
        aIndex = i;
      }

      if (s.substring(i, i + 1) == b) {
        bIndex = i;
      }

      i--;
    }

    if (aIndex != -1) {
      if (bIndex == -1) {
        return aIndex;
      } else {
        return Math.max(aIndex, bIndex);
      }
    } else {
      if (bIndex != -1) {
        return bIndex;
      } else {
        return -1;
      }
    }
  }
}

// console.log(badFunc('google', 'g', 'o'));  //  3
// console.log(badFunc('aba', 'a', 'b'));  //  2
// console.log(badFunc('', 'g', 'o'));   //  -1
// console.log(badFunc('google', 'x', 'o')); //  2
// console.log(badFunc('aba', '', '')); //  -1
// console.log(badFunc('aba', '', 'b')) //  1

function notBadFunc(s, a, b) {
  if (s) {
    if (!a && !b) return -1;
    return Math.max(a ? s.lastIndexOf(a) : -1, b ? s.lastIndexOf(b) : -1);
  }
  return -1;
}

// console.log(notBadFunc('google', 'g', 'o'));  //  3
// console.log(notBadFunc('aba', 'a', 'b'));  //  2
// console.log(notBadFunc('', 'g', 'o'));   //  -1
// console.log(notBadFunc('google', 'x', 'o')); //  2
// console.log(notBadFunc('aba', '', '')); //  -1
// console.log(notBadFunc('aba', '', 'b')) //  1

function getMaxStriIdx(s, a, b) {
  if (s) {
    if (!a && !b) return -1;

    let a_counter = 0;
    let b_counter = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] == a) a_counter = i;
      if (s[i] == b) a_counter = i;
    }

    return a_counter > b_counter ? a_counter : b_counter;
  }
  return -1;
}

console.log('badFunc', funcSpeed(badFunc('google', 'g', 'o')));
console.log('notBadFunc', funcSpeed(notBadFunc('google', 'g', 'o')));
console.log('getMaxStriIdx', funcSpeed(getMaxStriIdx('google', 'g', 'o')));

/////////////////////////////////////////////////////////////////////////
//  42
const binarySearchTree = {
  value: 4,

  left: {
    value: 2,
    left: {
      value: 1,
    },
    right: {
      value: 3,
    },
  },

  right: {
    value: 5,
    right: {
      value: 6,
    },
  },
};

function sumTree(tree) {
  let count = tree.value;

  if (tree.left) count += sumTree(tree.left);
  if (tree.right) count += sumTree(tree.right);
  return count;
}

// console.log(sumTree(binarySearchTree));

///////////////////////////////////////////////////////////////////////
//  43
function someFunc() {
  console.log(arguments);
}

Function.prototype.delay = function (delay) {
  return function (...args) {
    setTimeout(() => {}, delay);
  }.bind(this);
};

const someFnWithDelay = someFunc.delay(2000);
someFnWithDelay(1, 2, 3, 4);

////////////////////////////////////////////////////////////////////////
//  44
function compare(str1, str2) {
  const result = str1.toString().localeCompare(str2.toString());
  return result ? str2 : str1;
}
// console.log(compare(-1, 30));
// console.log(compare('', ''));
// console.log(compare('', 'a'));
// console.log(compare('a', ''));
// console.log(compare('banana', 'avocado'));
// console.log(compare('Banana', 'Avocado'));
// console.log(compare('banana', 'Avocado'));
// console.log(compare('ooooo', 'oo'));
// console.log(compare('oo', 'oooooo'));
// console.log(compare('oz', 'oooooo'));
// console.log(compare('oooooo', 'oooooZ'));

function compareOriginal(str1, str2) {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return 'Wrong type';
  }
  if (!a && !b) return 'The strings are empty';
  if (!a) return b;
  if (!b) return a;
  const a_lowerd = a.toLowerCase();
  const b_lowerd = b.toLowerCase();

  for (let i = 0; i < a_lowerd.length; i++) {
    const charCode1 = a_lowerd[i] ? a_lowerd[i].charCodeAt() : 0;
    const charCode2 = b_lowerd[i] ? b_lowerd[i].charCodeAt() : 0;

    if (charCode1 < charCode2) return a;
    if (charCode1 > charCode2) return b;
    if (charCode1 === charCode2) {
      if (a_lowerd[a_lowerd.length - 1] === a_lowerd[i]) {
        return a;
      } else {
        continue;
      }
    }
  }
}

// console.log(compareOriginal(-1, 30));
// console.log(compareOriginal('', ''));
// console.log(compareOriginal('', 'a'));
// console.log(compareOriginal('a', ''));
// console.log(compareOriginal('banana', 'avocado'));
// console.log(compareOriginal('Banana', 'Avocado'));
// console.log(compareOriginal('banana', 'Avocado'));
// console.log(compareOriginal('ooooo', 'oo'));
// console.log(compareOriginal('oo', 'oooooo'));
// console.log(compareOriginal('oz', 'oooooo'));
// console.log(compareOriginal('oooooo', 'oooooZ'));

////////////////////////////////////////////////////////////////////////
//  45
const some_arr = [1, 2, 3, 3, 4, 5, 6, 7];

const is_repeat = (arr) => {
  if (Array.isArray(arr)) {
    for (let i = 0; i < arr.length; i++) {
      const prev = arr[i - 1];
      if (prev === arr[i]) return true;
    }
  }
  return false;
};

// console.log(is_repeat(1));
// console.log(is_repeat(some_arr));
// console.log(is_repeat([1,2,3,4,5,6,7]));

//////////////////////////////////////////////////////////////////////

//  46
const some_arr1 = [1, 2, 3, 4, 5, 2, 5, 5, 6, 8, 9, 0, 0, 1, 3];

const findFirstLeft = (arr, x) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) return i;
  }
  return -1;
};

const findFirstRight = (arr, x) => {
  let lastIdx = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === x) {
      lastIdx = i;
    }
  }
  return lastIdx;
};

//////////////////////////////////////////////////////////////////////
//  47
/**
 * @param {string}
 * @param {number}
 * @param {number}
 * @return {string}
 *...
 * func('!', 4, -10, 34, 0) -> '!4!-10!34!0'
 */
const withSeparator = (...rest) => {
  const [separator, ...values] = rest;
  return separator + values.join(separator);
};
//  console.log(withSeparator('!', 4, -10, 34, 0));

//////////////////////////////////////////////////////////////////////
//  48
//  five(plus(seven(minus(three())))) -> 9
function expression(number, operation) {
  if (!operation) return number;
  return operation(number);
}

function plus(x) {
  // console.log('x',x)  //  4
  return function (y) {
    // console.log('y',y)  //  5
    return y + x;
  };
}

function minus(x) {
  //  console.log('x',x)  //  3
  return function (y) {
    //  console.log('y',y) // 7
    return y - x;
  };
}

function one(operation) {
  return expression(1, operation);
}
function two(operation) {
  return expression(2, operation);
}
function three(operation) {
  return expression(3, operation);
}
function four(operation) {
  return expression(4, operation);
}
function five(operation) {
  return expression(5, operation);
}
function six(operation) {
  return expression(6, operation);
}
function seven(operation) {
  return expression(7, operation);
}

// console.log(five(plus(seven(minus(three())))))

///////////////////////////////////////////////////////////////////
//  49
String.prototype.repeating = function (num) {
  return new Array(num).fill(this).join(' ');
};
'hello, world'.repeating(3);

//////////////////////////////////////////////////////////////////
//  50
function periodOutput(ms) {
  let counter = 0;
  setInterval(() => {
    if (counter < 10000) {
      console.log(counter);
      counter += ms;
    }
    return;
  }, ms);
}
//  periodOutput(1000);

function periodOutput1(ms) {
  let counter = ms;
  setTimeout(() => {
    if (counter < 10000) {
      console.log(counter);
      counter += ms;
      periodOutput1(counter);
    }
    return;
  }, counter);
}
periodOutput1(1000);

/////////////////////////////////////////////////////////////////////
//  51

// function add(x) {
//   return function(y) {
//       if (typeof y !== 'undefined') {
//           x = x + y;
//           return arguments.callee;
//       } else if () {
//           return x;
//       }
//   };
// }
// console.log(add(1)(2)(3)());

//////////////////////////////////////////////////////////////////////
//  52
function shortStrInArr(arr) {
  let initialLength = arr[0].length;
  let res = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length < initialLength) {
      res = arr[i];
    }
  }
  return res;
}
//  console.log(shortStrInArr(['Rostov','KS','Krasnodar']));

///////////////////////////////////////////////////////////////////////
//  53
/**
 *
 * @param {number[]} arr
 * @param {number} target
 * @return {array} // [[number, number],[number, number]]
 * func([1,2,3,4,5,6,7],5) -> [[1,4],[2,3]]
 */
function sumTarget(arr, target) {
  const result = [];
  const obj = {};

  for (let i = 0; i < arr.length; i++) {
    obj[arr[i]] = i;
  }

  for (const num in obj) {
    const secondNum = target - num;
    if (obj[secondNum]) {
      if (secondNum > num) {
        result.push([+num, +secondNum]);
      }
    }
  }
  return result;
}
sumTarget([1, 2, 3, 4, 5], 5);

function getTwoElemsForTargetSum(arr, target) {
  const results = [];
  const hashMap = {};

  for (let i = 0; i < arr.length; i++) {
    if (hashMap[arr[i]]) {
      results.push([hashMap[arr[i]], arr[i]]);
    } else {
      hashMap[target - arr[i]] = arr[i];
    }
  }
  return results;
}
//  console.log(getTwoElemsForTargetSum([1,2,3,4,5,6,7], 5))

////////////////////////////////////////////////////////////////////////
//  54
/**
 *
 * @param {number[]} arr
 * @return {number} // [[number, number],[number, number]]
 * func([1,4,5,6,73,7,90,100]) -> 4
 */
function findMinEven(arr) {
  let isExist = false;
  let minEven = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0 && (!isExist || arr[i] < minEven)) {
      //	2,4,6,8
      minEven = arr[i];
      isExist = true;
    }
  }
  return minEven;
}
//  console.log(findMinEven([7,8,9,1,2,3,6,5,4])); // 2

///////////////////////////////////////////////////////////////////
//  54
const flat = (arr) => {
  const result = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      const rec = flat(arr[i]);
      for (let j = 0; j < rec.length; j++) {
        result.push(rec[j]);
      }
    } else {
      result.push(arr[i]);
    }
  }
  return result;
};
//  console.log(flat([ [1], [[2,3]], [[[4]]] ]));

///////////////////////////////////////////////////////////////////
//  55
function reverseStr(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    console.log(str[i]);
    reversed += str[i];
  }
  return reversed;
}
//  console.log(reverseStr('abcdef'))	//	fedcba

///////////////////////////////////////////////////////////////////
//  56
function arrSubset(arr1, arr2) {
  const source = [...arr1];
  if (source.length < arr2.length) return false;

  for (let i = 0; i < arr2.length; i++) {
    const idx = source.indexOf(arr2[i]);
    if (idx === -1) return false;
    delete source[idx];
  }

  return true;
}
// console.log(arrSubset([1,2,3],[2,3,1]));	//	true
// console.log(arrSubset([2,1,1,3],[1,2,3]));	//	true
// console.log(arrSubset([1,1,1,3],[1,3,3]));	//	false
// console.log(arrSubset([1,2],[2,3,1]));	//	false

///////////////////////////////////////////////////////////////////
//  57
//  rotate matrix at right up to 90 degrees

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

function print(arr) {
  arr.forEach((i) => console.log(i));
}

function rotate(m) {
  const rotated = m[0].map((_) => []);

  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[i].length; j++) {
      const value = m[i][j];
      rotated[j][m.length - 1 - i] = value;
    }
  }

  return rotated;
}

//print(rotate(matrix));

function rotate180(m) {
  return rotate(rotate(m));
}

function rotate270(m) {
  return rotate(rotate180(m));
}
//print(rotate270(matrix));

////////////////////////////////////////////////////////////////////
//  58
//	O(log(n))
function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  if (target < arr[start] || target > arr[end]) {
    return -1;
  }

  while (true) {
    if (target === arr[start]) return start;
    if (target === arr[end]) return end;

    if (end - start <= 1) return -1;
    const middle = Math.floor((start + end) / 2);

    if (target > arr[middle]) {
      start = middle + 1;
    } else if (target < arr[middle]) {
      end = middle - 1;
    } else {
      return middle;
    }
  }
}
// console.log(binarySearch([1,2,3,4,5,6,7,8,9], 7));
// console.log(binarySearch([1,2,3,4,5,6,7,8,9], 100));

//////////////////////////////////////////////////////////////////////
//  59

class LinkedList {
  #length = 0;
  #head = null;
  #tail = null;

  addToTail(value) {
    const node = {
      value,
      next: null,
    };

    if (this.#length === 0) {
      this.#head = node;
      this.#tail = node;
    } else {
      this.#tail = node;
    }
    this.#length++;
  }

  removeFromHead(value) {
    if (this.#length === 0) {
      return;
    } else {
      const value = this.#head.value;
      this.#head = this.#head.next;
      this.#length--;
      return value;
    }
  }

  size() {
    return this.#length;
  }
}

class Queue {
  #storage = {};
  #last = 0;
  #first = 0;

  enqueue(item) {
    this.#storage[this.#last] = item;
    this.#last++;
  }

  dequeue() {
    if (this.size === 0) return;
    const value = this.#storage[this.#first];
    delete this.#storage[this.#first];
    this.#first++;
    return value;
  }

  get size() {
    return this.#last - this.#first;
  }
}

const q1 = new Queue();
q1.enqueue(1);
q1.enqueue(2);
q1.enqueue(30);

//console.log(q1.size)

///////////////////////////////////////////////////////////////////////////
//  60
function groupBy(arr, fn) {
  const result = {};
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const key = typeof fn === 'function' ? fn(current) : current[fn];

    if (!result[key]) result[key] = [];
    result[key].push(current);
  }
  return result;
}
// console.log(groupBy([6.1, 4.2, 6.3], Math.floor))
// console.log(groupBy(['one','two','three'], 'length'))

///////////////////////////////////////////////////////////////////////////
//  61
const test =
  'Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut suscipit velit efficitur eget Sed sit amet posuere risus ';

/**
  @param {string} text
  @return {string[]}
*/

//  Not completed solution
function myStringIntoSmsArr(text) {
  const CHUNK_SIZE = 137; //  140 - 3 reserved chars for ' k/n'
  const CHUNK_LENGTH = Math.ceil(text.length / CHUNK_SIZE);
  const arr = text.split(' ');
  const result = [];

  let l = 0; //  left pointer for slicing array
  let r = arr.length; //  right pointer for slicing array
  let accum = 0; //  temporary accumulator for checking max chars value
  let count = 0; //  messages counter
  let i = 0;
  while (i < arr.length) {
    const char_count = arr[i].length;
    accum += char_count + 1;
    //  Check if we get the message chars limit
    if (accum >= CHUNK_SIZE) {
      accum = 0;
      count++;
      r = i;
      const target = arr.slice(l, r).join(' ') + ` ${count}/${CHUNK_LENGTH}`;
      result.push(target);
      l = r;
    }
    i++;
  }
  //  Add last message which is less than CHUNK_SIZE
  result.push(
    arr.slice(l, arr.length).join(' ') + ` ${CHUNK_LENGTH}/${CHUNK_LENGTH}`,
  );
  return result;
}

console.log(myStringIntoSmsArr(test));

console.log('------------------------------------');
var source = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium, augue in iaculis semper, magna sem gravida odio, ut rhoncus lacus nulla a justo. Fusce mi elit, laoreet pulvinar est eu, pellentesque posuere orci. Mauris vehicula feugiat tellus, eget bibendum nibh iaculis non. Mauris condimentum vulputate felis non dictum. Morbi quis eros nec lacus sollicitudin pharetra ac ac turpis. Ut scelerisque leo augue, a ullamcorper velit porttitor ut. Phasellus hendrerit dui ipsum, non rhoncus arcu lobortis ut. Aliquam fringilla et diam sed finibus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla facilisi. Pellentesque feugiat ornare ligula, et bibendum tellus. In hac habitasse platea dictumst. Fusce a urna suscipit neque luctus faucibus sed a velit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam ex ipsum, luctus non nunc vel, porta tincidunt quam. Proin eu ullamcorper eros. Morbi laoreet tellus in posuere iaculis. Nam molestie et purus eget efficitur. Duis aliquam purus in eros volutpat lacinia. Mauris vulputate quis sem at elementum. Fusce dictum lectus id lectus iaculis, eu commodo sem tristique. Aenean consectetur auctor sem vitae iaculis. Cras mollis libero sit amet congue vulputate. Ut tempor tellus sed arcu vehicula, non interdum massa condimentum. Donec ultricies, libero hendrerit sollicitudin gravida, tortor nunc vehicula est, eu placerat ex nisl ultrices neque. Morbi in auctor nunc, pharetra posuere ante. Curabitur ac gravida urna. Curabitur aliquam pellentesque iaculis. Etiam molestie, quam id pretium iaculis, elit nisi tempor dui, eu efficitur lacus lacus at lacus. 
`;
var text = source.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');

//  Complete version
function sliceStr(t) {
  let str = t;
  const MESSAGE_SIZE = 140;
  const MESSAGES_LENGTH = Math.ceil(t.length / MESSAGE_SIZE);
  const COUNTER_SIZE = String(MESSAGES_LENGTH).length * 2 + 2;
  const CHUNK_SIZE = MESSAGE_SIZE - COUNTER_SIZE;
  const CHUNKS_LENGTH = Math.ceil(t.length / CHUNK_SIZE);
  const result = [];
  let counter = 0;

  while (str !== '') {
    let lastSpaceIdx = 0;

    for (let i = 0; i < CHUNK_SIZE; i++) {
      if (str[i] === ' ') {
        lastSpaceIdx = i;
      }

      if (i === str.length - 1) {
        lastSpaceIdx = str.length;
      }
    }
    counter++;
    result.push(str.slice(0, lastSpaceIdx) + ` ${counter}/${CHUNKS_LENGTH}`);
    str = str.slice(lastSpaceIdx);
  }
  return result;
}
console.log(sliceStr(text));
console.log('------------------------------------');
