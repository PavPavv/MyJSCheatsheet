const now = require('performance-now');

const funcSpeed = func => {
  const start = now();

  for (let i = 0; i < 1_000_000; i++) {
    func;
  }

  const end = now();
  return end - start;
};

// 1
/*
  Example:
  counter(); // 1
  counter(); // 2
  counter(); // 3
  ...
*/

const count = num => {
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

  setTimeout(() => {
    console.log('setTimeout')
  }, 0);

  // 1 микрозадача текущего контекста вызова 
  let p = new Promise((resolve, reject) => {
    console.log('create promise');
    resolve();
  });

  // 3 микрозадача второй макрозадачи
  p.then(() => {
    console.log('handling promise')
  });

  // 2 следующая МАКРОзадача 2
  console.log('clg');
};

// create promise -> clg -> handling promise -> setTimeout
//queues();
//////////////////////////////////////////////////////////////////

// 3
/**
  * @param {string} J
  * @param {string} S
  * @return {number}
*/
const stonesAndJewels = () => {
  const j = 'cool';
  const s = 'location';

  const commonLetters = (str1, str2) => {
    let counter = 0;
    let set = new Set;

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
  //console.log('answer', commonLetters(j, s));

  const commonLetters1 = (str1, str2) => {
    let set = new Set(str1);
    return [...str2].reduce((ac, s) => set.has(s) + ac, 0);
  };
  //console.log(commonLetters1(j, s));

  const commonLetters2 = (str1, str2) => {
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
  console.log(commonLetters2(j, s));

  const commonLetters3 = (str1, str2) => str2.replace(new RegExp(`[^${str1}]`, 'g'), '').length;
  console.log('commonLetters3', commonLetters3(j, s))

};
//stonesAndJewels();
//////////////////////////////////////////////////////////////////////

// 4
const stonesAndJewelsPrecise = () => {
  /** 
    * @param {string} J
    * @param {string} S
    * @return {number} amount of unique symbols
  */
  const commonLetters = (str1, str2) => {
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
  console.log('answer', commonLetters('cool', 'location'));
};
//stonesAndJewelsPrecise();
/////////////////////////////////////////////////////////////////////

// 5
/*
  0, 1,1,2,3,5,8,13,21,34,55,89,144
  func(9) => 34
*/
const fibonacci = num => {
  if (num < 2) {
    return num;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
};
//console.log(fibonacci(9))


const fibonacciLong = num => {
  const result = [0, 1];

  for (let i = 2; i <= num; i++) {
    let prev1 = result[i - 1];
    let prev2 = result[i - 2];
    result.push(prev1 + prev2);
  }

  return result[num];
};
//console.log(fibonacciLong(9))
/////////////////////////////////////////////////////////////////////////

// 6
/*
palindrome('anna') -> true
palindrome('table') -> false
*/
const palindrome = str => {
  str = str.toLowerCase();
  return str === str.split('').reverse().join('');
};
// console.log(palindrome('aka'));
// console.log(palindrome('bu'));
// console.log(palindrome('buy'));
/////////////////////////////////////////////////////////////////////////

// 7
/*
fizzbuzz(5) -> 1 2 'fizz' 4 'buzz'
*/
const fizzbuzz = n => {
  for (let i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      console.log('fizzbuzz')
    } else if (i % 3 === 0) {
      console.log('fizz')
    } else if (i % 5 === 0) {
      console.log('buzz')
    } else {
      console.log(i)
    }
  }
};
// fizzbuzz(5);
// fizzbuzz(12);
// fizzbuzz(15);

const fizzbuzz1 = n => {
  for (let i = 1; i <= n; i++) {
    console.log((i % 3 === 0 && i % 5 === 0) && 'fizzbuzz' || i % 3 === 0 && 'fizz' || i % 5 === 0 && 'buzz' || i);
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
const findVowels = str => {
  let matched = str.match(/[aeiou]/gi);
  return matched ? matched.length : 0;
};
//console.log(findVowels('anna'));
/////////////////////////////////////////////////////////////////////////

// 9
/** 
  @param {string}
  @param {string}
  @return {boolean}
  anagram('finder', 'friend') -> true
  anagram('find', 'friend') -> false
*/
const buildCharObj = str => {
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
}
//console.log(anagram('finder', 'friend'))
////////////////////////////////////////////////////////////

// 10
const twoSum = (numsArr, target) => {
  let result = [];

  for (let i = 0; i < numsArr.length; i++) {

    for (let j = i + 1; j < numsArr.length; j++) {
      if (numsArr[i] + numsArr[j] === target) {
        result.push(i, j);
      }
    }
  }
  return result;
};
//console.log(twoSum([2, 7, 11, 15], 9));

const twoSum1 = (numsArr, target) => {
  const result = {};
  for (let i = 0; i < numsArr.length; i++) {
    if (result[numsArr[i]] >= 0) {
      return [result[numsArr[i]], i];
    }
    result[target - numsArr[i]] = i; //at first we create an object from all the array numbers
  }
};
//console.log(twoSum1([2, 7, 11, 15], 9));
//////////////////////////////////////////////////////////////////////

// 11
/** 
  * @param {number} x
  * @return {number} 
  * func(123) -> 321
*/
const reverseInt = int => {
  const LIMIT = 2_147_483_648;
  const k = int < 0 ? -1 : 1;
  const n = parseInt(Math.abs(int).toString().split('').reverse().join(''));
  return n > LIMIT ? 0 : n * k;
};
//console.log(reverseInt(123))
////////////////////////////////////////////////////////////////////////

// 12
/** 
  * @param {number}
  * @return {boolean}
  * func(121) -> true
*/
const middlePalindrome = x => {
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
const longestComPrfx = strArr => {
  if (strArr.length < 2 || typeof (strArr[0]) !== 'string') return '';
  const lowerArr = strArr.map(str => str.toLowerCase());

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
// console.log(varTest());

// 15
const varTest1 = () => {
  let a = 2;
  let x = 1 + (a *= 2);
  return `${a} | ${x}`;
};
//console.log(varTest1());

const valTest = () => {
  let a = "" + 1 + 0; // "10"
  let b = "" - 1 + 0; // -1
  let c = true + false; // 1
  let d = 6 / "3"; // 2
  let e = "2" * "3"; // 6
  let f = 4 + 5 + "px"; // "9px"
  let g = "$" + 4 + 5; // "$45"
  let h = "4" - 2; // 2
  let i = "4px" - 2; // NaN
  let j = 7 / 0; // Infinity
  let k = "  -9  " + 5; // " -9 5"
  let l = "  -9  " - 5; // -14
  let m = null + 1; // 1
  let n = undefined + 1; // NaN
  let o = " \t \n" - 2; // -2

  return `${a} | ${b} | ${c} | ${d} | ${e} | ${f} | ${g} | ${h} | ${i} | ${j} | ${k} | ${l} | ${m} | ${n} | ${o}`;
};
//console.log(valTest());

const valTest1 = () => {
  let a = 5 > 4; // true
  let b = "ананас" > "яблоко"; // false
  let c = "2" > "12"; // true
  let d = undefined == null; // true
  let e = undefined === null; // false
  let f = null == "\n0\n";  // false
  let g = null === +"\n0\n"; // false

  return `${a} | ${b} | ${c} | ${d} | ${e} | ${f} | ${g}`;
};
//console.log(valTest1());

const valTest2 = () => {
  let a = null || 2 || undefined; // 2
  let b = 1 && null && 2; // null
  let c = null || 2 && 3 || 4; // 3
  let d = Boolean(-1 || 0); // -1 -> true
  let e = Boolean(-1 && 0); // false
  let f = Boolean(null || -1 && 1); // true

  return `${a} | ${b} | ${c} | ${d} | ${e} | ${f}`;
};
//console.log(valTest2())
//////////////////////////////////////////////////////////////////

// 16
const loops = () => {
  for (let i = 0; i < 3; i++) {
    console.log(`number ${i}!`);
  }

  let i = 0;
  while (i < 3) {
    console.log(`number ${i}!`)
    i++;
  }

}
//loops();
/////////////////////////////////////////////////////////////////

// 17
/** 
  * @param {number} int
  * @return {number[]}
  * func(10) -> [2,3,5,7];
*/
const allPrimeNumsFromTo = int => {
  let result = [];

  nextPrime:
  for (let i = 2; i <= parseInt(int); i++) {

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

const bubbleSort = numArr => {
  if (!numArr) {
    console.log('Нет данных')
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
}

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
const countSameLetters = str => {
  let obj = {};

  for (let letter of str) {
    if (!obj[letter]) {
      obj[letter] = 1;
    } else {
      obj[letter] += 1;
    }
  }

  return obj;
}
//console.log(countSameLetters('aaba'));

const countSameLetters1 = str => {
  return [...str].reduce((a, e) => { a[e] = a[e] ? a[e] + 1 : 1; return a }, {});
};
//console.log(countSameLetters1('aaba'));

const countSameLetters2 = str => {
  return [...str].reduce((res, char) => (res[char] = (res[char] || 0) + 1, res), {});
};
//console.log(countSameLetters2('aaba'));

const countSameLetters3 = str => {
  const obj = {};

  str.replace(/\S/g, letter => obj[letter] = (isNaN(obj[letter]) ? 1 : obj[letter] + 1));
  return obj;
};
//console.log(countSameLetters3('aaba'));

const countSameLetters4 = str => {
  const charObj = {};
  for (let char of str.replace(/[^\w]/g).toLowerCase()) {
    charObj[char] = charObj[char] + 1 || 1;
  }
  return charObj;
};

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
const isEmptyObj = obj => {
  return (Object.keys(obj).length) ? false : true;
};
//console.log(isEmptyObj({}));

const isEmptyObj1 = obj => {
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

const getObjNumValues = obj => {
  return Array.from(Object.values(obj)).reduce((a, b) => a + b, 0)
};
//console.log(getObjNumValues(salaries));

const getObjNumValues1 = obj => {
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
  title: "My menu"
};
const multiplyNumeric = obj => {
  for (key in obj) {
    if (typeof (obj[key]) === 'number') {
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
  }

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
  return (str.length > max) ? str.slice(0, max - 1) + '...' : str;
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
    .map(s => s - 0)
    .filter(s => isNaN(s) !== true)
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

const numberifyStr = str => {
  let obj = {};
  let prevLetter = '';

  str.split('').forEach(letter => {
    if (letter === prevLetter) {
      obj[letter]++;
    } else {
      prevLetter = letter;
      obj[letter] = 1;
    }
  });

  const result = [];
  const keys = Object.keys(obj);
  keys.forEach(key => {
    result.push(`${key}${obj[key]}`);
  });

  return result.join('');
};
// console.log(numberifyStr('AABCEEEDDCAAYYY'));
// console.log('numberifyStr', funcSpeed(numberifyStr('AABCEEEDDCAAYYY')));
///////////////////////////////////////////////////////////////////////////////////////

// 29
/**
 * @param {string} str
 * @return {string}
 * func('AABCEEEDDCAAYYY') -> 'A2B1C1E3D2C1A2Y3';
 */
const numberifyStrWithReapeat = str => {
  return str
    .split('')
    .reduce((acc, str, i, arr) => {
      if (str === arr[i + 1]) {
        acc.count += 1;
      } else {
        acc.result += `${str}${acc.count + 1}`;
        acc.count = 0;
      }

      return acc;
    }, { result: '', count: 0 }).result

};
//console.log(numberifyStrWithReapeat('AABCEEEDDCAAYYY'));

const numberifyStrWithReapeat1 = str => {
  return str.replace(/([A-Z])(\1*)?/g, (x => {
    return `${x.charAt(0)}${x.length}`;
  }))
};
//console.log(numberifyStrWithReapeat1('AABCEEEDDCAAYYY'));
////////////////////////////////////////////////////////////////////////////////////////

// 30
/**
 * @param {string} str
 * @return {string}
 * func('AABCEEEDDCAAYYY') -> 'A4B1C2E3D2Y3';
 */

const numberifyStrTillEnd = str => {
  const obj = {};
  const result = [];

  for (let letter of str) {
    if (obj[letter]) {
      obj[letter] += 1;
    } else {
      obj[letter] = 1;
    }
  }

  Object.keys(obj).forEach(key => result.push(`${key}${obj[key]}`));
  return result.join('');

};
// console.log(numberifyStrTillEnd('AABCEEEDDCAAYYY'));

const numberifyStrTillEnd1 = str => {
  const obj = {};
  const result = [];
  str.replace(/\S/g, letter => {
    obj[letter] = (isNaN(obj[letter])) ? 1 : obj[letter] + 1
  });

  for (const key in obj) {
    result.push(`${key}${obj[key]}`);
  }
  return result.join('');

};
// console.log(numberifyStrTillEnd1('AABCEEEDDCAAYYY'));

// console.log('numberifyStrTillEnd', funcSpeed(numberifyStrTillEnd('AABCEEEDDCAAYYY')));
// console.log('numberifyStrTillEnd1', funcSpeed(numberifyStrTillEnd1('AABCEEEDDCAAYYY')));
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
      key: obj[arr[i + 1]]
    };
  }
  return obj;
};

//console.log(strToDeepObj1('a.b.d.e', '.'));
//////////////////////////////////////////////////////////

// 34




