const now = require("performance-now");

//  func speed test in ms
const funcSpeed = (func) => {
  const start = now();

  for (let i = 0; i < 1_000_000; i++) {
    func;
  }

  const end = now();
  const result = end - start;
  return `${result.toFixed(2)} ms`;
};

//  kata 1 Level 8
/**
 * @param {string} strings
 * @return {string}
 * func('This is a function for supreme!') -> 'This is a noitcnuf for !emerpus';
 */

function spinWords(string) {
  const arr = string.split(" ");

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].length > 4) {
      arr[i] = arr[i].split("").reverse().join("");
    }
  }

  return arr.join(" ");
}
//console.log(spinWords("This is a function for supreme!"));

//  kata 2 Level 8

/**
 * @param {number} num
 * @return {number}
 * func(10) -> -10;
 */
function makeNegative(num) {
  return num < 0 ? num : num * -1;
}

//console.log(makeNegative(0.12));

//  kata 3 Level 8
/**
 * @param {string[]} friends
 * @return {string[]}
 * func(["Mark", "John", "Sveta", "Maria"]) -> ["Mark", "John"];
 */

function friend(friends) {
  return friends.filter((friend) => friend.length === 4);
}
//console.log(friend(["Mark", "John", "Anna", "Maria"]));

//  kata 4 Level 8
/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 * func(1,2) -> 1;
 */

function getSumOfTwoNumsRange(a, b) {
  if (a === b) return a;
  if (a > b) {
    [a, b] = [b, a];
  }

  const arr = [];
  const range = {
    from: a,
    to: b,
  };

  range[Symbol.iterator] = function () {
    return {
      current: this.from,
      last: this.to,
      next() {
        if (this.current <= this.last) {
          return {
            done: false,
            value: this.current++,
          };
        } else {
          return {
            done: true,
          };
        }
      },
    };
  };

  for (let num of range) {
    arr.push(num);
  }

  return arr.reduce((a, b) => a + b, 0);
}
//
// console.log(getSumOfTwoNumsRange(1, 1));
// console.log(getSumOfTwoNumsRange(1, 2));
//console.log(getSumOfTwoNumsRange(129, -353));

function getSumOfTwoNumsRangeOptimized(a, b) {
  let result = 0;
  const bigger = a > b ? a : b;
  const smaller = a > b ? b : a;
  for (let i = smaller; i <= bigger; i++) {
    result += i;
  }
  return result;
}

// console.log(getSumOfTwoNumsRangeOptimized(1, 1));
// console.log(getSumOfTwoNumsRangeOptimized(1, 2));
// console.log(getSumOfTwoNumsRangeOptimized(129, -353));

//  kata 5 Level 8
/**
 * @param {string} s
 * @return {string}
 * func('testing') -> 't';
 */

function getMiddle(s) {
  const arr = s.split("");
  const even = s.length % 2 === 0 ? true : false;
  const middle = arr[Math.floor((arr.length - 1) / 2)];
  const evenMiddle =
    arr[Math.floor((arr.length - 1) / 2)] + arr[Math.floor(arr.length / 2)];

  return even ? evenMiddle : middle;
}

// console.log(getMiddle("test"));
// console.log(getMiddle("testing"));

function getMiddleOptimized(s) {
  return s.slice((s.length - 1) / 2, s.length / 2 + 1);
}

// console.log(getMiddleOptimized("test"));
// console.log(getMiddleOptimized("testing"));

//  kata 6 Level 7
/**
 * @param {number} num
 * @return {number}
 * func(3212) -> 9414;
 */

function squareDigits(num) {
  return +num
    .toString()
    .split("")
    .map((n) => n * n)
    .join("");
}
// console.log(squareDigits(9119));
//console.log(squareDigits(3212));

//  kata 7 Level 7
/**
 * @param {string} word
 * @return {string}
 * func('Success') -> ')())())';
 */

function duplicateEncode(word) {
  const arr = word.toLowerCase().split("");
  const set = new Set(arr);
  const obj = {};

  for (let i = 0; i < arr.length; i++) {
    if (set.has(arr[i])) {
      obj[arr[i]] = obj[arr[i]] ? obj[arr[i]] + 1 : 1;
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (obj[arr[i]] > 1) {
      arr[i] = ")";
    } else {
      arr[i] = "(";
    }
  }

  return arr.join("");
}
//console.log(duplicateEncode("Success"));

function duplicateEncodeOptimized(word) {
  return word
    .toLowerCase()
    .split("")
    .map((el, idx, arr) => {
      return arr.indexOf(el) === arr.lastIndexOf(el) ? "(" : ")";
    })
    .join("");
}
//console.log(duplicateEncodeOptimized("Success"));

//  kata 8 Level 7
/**
 * @param {string} str
 * @return {number}
 * func('abracadabra') -> 5;
 */

function getVowels(str) {
  return str
    .replace(/[aeiou]/gi, "*")
    .split("")
    .filter((item) => item === "*").length;
  console.log(getVowels("abracadabra"));
}

function getVowels1(str) {
  return (str.match(/[aeiou]/gi) || []).length;
}
//console.log(getVowels1("abracadabra"));

//  kata 9 Level 7
/**
 * @param {string} str
 * @return {number}
 * func('abracadabra') -> 5;
 */

function removeChar(str) {
  return str.split("").slice(1, -1).join("");
}
//console.log(removeChar("eloquent"));

function removeCharOptimized(str) {
  return str.slice(1, -1);
}
//console.log(removeCharOptimized("eloquent"));

//  kata 10 Level 7
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {boolean}
 * func([2,3],[4,6]) -> true;
 */

function compTwoArrsBySqr(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
  if (arr1.length !== arr2.length) return false;
  if (!arr1 || !arr2 || arr1.length < 1 || arr2.length < 1) return false;

  const sortedArr1 = arr1.sort((a, b) => a - b);
  const sortedArr2 = arr2
    .sort((a, b) => a - b)
    .map((item) => +Math.sqrt(item).toFixed(3));

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }

  return true;
}
// console.log(
//   "bad",
//   compTwoArrsBySqr(
//     [10, 10, 3, 1, 9, 0, 9, 8, 0, 4, 0, 6, 6, 6, 6, 7, 4, 10, 2, 4, 1, 6, 8],
//     [
//       36,
//       0,
//       36,
//       64,
//       16,
//       81,
//       36,
//       1,
//       0,
//       9,
//       100,
//       1,
//       16,
//       100,
//       81,
//       64,
//       1,
//       100,
//       16,
//       36,
//       49,
//       4,
//       36,
//     ]
//   )
// );

// console.log(
//   "good",
//   compTwoArrsBySqr(
//     [8, 5, 4, 2, 10, 0, 8, 1, 0, 5, 4, 1, 2, 1, 3, 1, 9, 2, 4, 8, 0],
//     [9, 0, 1, 1, 4, 64, 1, 64, 16, 4, 1, 25, 16, 81, 0, 64, 0, 16, 4, 25, 100]
//   )
// );

//  kata 11 Level 7
/**
 * @param {string} numbers
 * @return {number} index of 'black sheep'
 * func('1 2 2') ->  1
 */

function iqTest(numbers) {
  const arr = numbers.split(" ");
  let evenCount = 0;
  let oddCount = 0;
  let lastEven = 0;
  let lastOdd = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      evenCount++;
      lastEven = arr[i];
    } else {
      oddCount++;
      lastOdd = arr[i];
    }
  }

  if (evenCount + oddCount > 2) {
    if (oddCount > 1) {
      return arr.indexOf(lastEven) + 1;
    } else {
      return arr.indexOf(lastOdd) + 1;
    }
  }
}

//console.log(iqTest("1 2 2"));

function iqTest1(numbers) {
  const numsArr = numbers.split(" ").map((x) => x % 2); //  [0,0,0,0,0,0,0,1]
  const arrSum = numsArr.reduce((a, b) => a + b); //  1
  const target = arrSum > 1 ? 0 : 1;

  return numsArr.indexOf(target) + 1;
}

//console.log(iqTest1("2 2 2 2 2 2 2 1"));

//  kata 12 (Find the odd int) Level 7
/**
 * @param {array} arr
 * @return {number}
 * func([1, 2, 2, 3, 3, 3, 4, 3, 3, 3, 2, 2, 1]) ->  4
 */

function findOdd(arr) {
  let obj = {};

  for (let i = 0; i < arr.length; i++) {
    obj[arr[i]] = obj[arr[i]] ? obj[arr[i]] + 1 : 1;
  }

  for (let key in obj) {
    if (obj[key] % 2 !== 0) return +key;
  }
}
//console.log(findOdd([1, 2, 2, 3, 3, 3, 4, 3, 3, 3, 2, 2, 1]));

function findOddOptimized(arr) {
  return arr.find((item, index) => arr.filter((el) => el === item).length % 2);
}
//console.log(findOddOptimized([1, 2, 2, 3, 3, 3, 4, 3, 3, 3, 2, 2, 1]));

const findOddSuper = (arr) => arr.reduce((a, b) => a ^ b);
//console.log(findOddSuper([1, 2, 2, 3, 3, 3, 4, 3, 3, 3, 2, 2, 1]));

//  kata 13 (Persistent Bugger) Level 6
/**
 * @param {number} num
 * @return {number}
 * func(39) ->  3
 */

function persistence(num) {
  if (num < 10) return 0;
  let counter = 0;
  let test = 0;

  function multiplyNum(number) {
    counter++;
    const numbers = number.toString().split("").map(Number);
    let sum = 1;

    for (let i = 0; i < numbers.length; i++) {
      sum *= numbers[i];
    }

    test = sum;
  }
  multiplyNum(num);

  while (test > 9) {
    multiplyNum(test);
  }

  return counter;
}
//console.log(persistence(25));

function persistenceOpt(num) {
  return `${num}`.length > 1
    ? 1 + persistenceOpt(`${num}`.split("").reduce((a, b) => a * +b))
    : 0;
}
//console.log(persistenceOpt(999));

//  kata 14 (Write Number in Expanded Form) Level 6
/**
 * @param {number} num
 * @return {string}
 * func(70304) -> '70000 + 300 + 4';
 */

function expandedForm(num) {
  const arr = parseInt(num).toString().split("").reverse();
  let temp = "";

  for (let i = 0; i < arr.length; i++) {
    if (+arr[i] !== 0) {
      temp += arr[i] + "0".repeat(i) + " ";
    }
  }

  const res = temp.split(" ").reverse().slice(1).join().replace(/[,]/g, " + ");
  temp = "";
  return res;
}
// console.log(expandedForm(10));
// console.log(expandedForm(12));
// console.log(expandedForm(101));
// console.log(expandedForm(172));
// console.log(expandedForm(1724));
// console.log(expandedForm(70304));

//  kata 15 (Find the unique number) Level 6
/**
 * @param {number[]} arr
 * @return {number}
 * func([8, 8, 8, 8, 8, 7, 8]) -> 7;
 */
function findUniq(arr) {
  const testArr = arr.slice(0, 3);
  const major = testArr[0] === testArr[1] ? testArr[0] : testArr[2];

  return arr.find((item) => item !== major);
}
//console.log(findUniq([8, 8, 8, 8, 8, 7, 8]));

function findUniqOptimized(arr) {
  return arr.find((item) => arr.indexOf(item) === arr.lastIndexOf(item));
}
//console.log(findUniqOptimized([8, 8, 8, 8, 8, 7, 8]));

// kata 16 (Format a string of names like 'Bart, Lisa & Maggie') Level 6
/**
 * @param {object[]} names
 * @return {string}
 * func([ {name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'} ]) - > 'Bart, Lisa & Maggie';
 */

function formatObjArr(arr) {
  const newArr = arr.map((item) => item.name);
  const firstPart = newArr.slice(0, -2).join(", ");
  const lastPart = newArr.slice(-2).join(" & ");

  if (firstPart) {
    return firstPart + ", " + lastPart;
  } else {
    return lastPart;
  }
}
// console.log(
//   formatObjArr([
//     { name: "Bart" },
//     { name: "Lisa" },
//     { name: "Maggie" },
//     { name: "Homer" },
//     { name: "Marge" },
//   ])
// );

// console.log(
//   formatObjArr([{ name: "Bart" }, { name: "Lisa" }, { name: "Maggie" }])
// );

//console.log(formatObjArr([{ name: "Bart" }, { name: "Lisa" }]));

//  kata 17 (Break camelCase) Level 6
/**
 * @param {string} str
 * @return {string}
 * func('SuperCool') -> 'Super Cool'
 */

function breakUpCamelCase(str) {
  const result = [];

  for (let i = 0; i < str.length; i++) {
    const test = /[A-Z]/.test(str[i]);
    if (test) {
      result.push(" ", str[i]);
    } else {
      result.push(str[i]);
    }
  }
  return result.join("").trim();
}
// console.log(breakUpCamelCase("ABCDEFG"));
// console.log(breakUpCamelCase("AaaaaaaaBbbbbbbbbbbCDEFG"));

function breakUpCamelCaseOpt(text) {
  return text.split(/(?=[A-Z])/).join(" ");
}
// console.log(breakUpCamelCaseOpt("ABCDEFG"));
// console.log(breakUpCamelCaseOpt("AaaaaaaaBbbbbbbbbbbCDEFG"));

//  kata 18 (Counting Duplicates, how many chars repeats more than 1 time) Level 6
/**
 * @param {string} str
 * @return {number}
 * func(aabBcde) -> 2 (means 2 numbers repeats more than 1 time)
 */

function uniqueLettersRepeatCount(str) {
  let arr = str.toLowerCase().split("");
  const objMap = {};

  for (let i = 0; i < arr.length; i++) {
    objMap[arr[i]] = objMap[arr[i]] ? objMap[arr[i]] + 1 : 1;
  }

  arr = [];

  for (let key in objMap) {
    if (objMap[key] > 1) {
      arr.push(key);
    }
  }

  return arr.length;
}
// console.log("uniqueLettersRepeatCount", uniqueLettersRepeatCount("aabBcde"));
// console.log(
//   "uniqueLettersRepeatCount",
//   funcSpeed(uniqueLettersRepeatCount("aabBcde"))
// );

function uniqueLettersRepeatCount1(str) {
  let arr = str.toLowerCase().split("");
  let counter = 0;

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        counter++;
      }
    }
  }

  return counter;
}
// console.log("uniqueLettersRepeatCount1", uniqueLettersRepeatCount1("aabBcde"));
// console.log(
//   "uniqueLettersRepeatCount1",
//   funcSpeed(uniqueLettersRepeatCount1("aabBcde"))
// );

function uniqueLettersRepeatCountOpt(text) {
  return (
    text
      .toLowerCase()
      .split("")
      .sort()
      .join("")
      .match(/([^])\1+/g) || []
  ).length;
}
// console.log(
//   "uniqueLettersRepeatCountOpt",
//   uniqueLettersRepeatCountOpt("aabBcde")
// );
// console.log(
//   "uniqueLettersRepeatCountOpt",
//   funcSpeed(uniqueLettersRepeatCountOpt("aabBcde"))
// );

//  kata 19 (Array Helpers) Level 5
/**
 * @param {}
 * @return {}
 * func() ->
 */

const testArr = [1.34, 0.34, 3.45, 10.23, 19.2333, 0,22302];
// function square(arr) {
//   return arr.map((item) => item * item);
// }

Array.prototype.square = function () {
  return this.map((item) => item * item);
};// console.log(
//   "uniqueLettersRepeatCountOpt",
//   funcSpeed(uniqueLettersRepeatCountOpt("aabBcde"))
// );

Array.prototype.cube = function () {
  return this.map((item) => item * item * item);
};

Array.prototype.average = function () {
  if (!this.length) return NaN;
  if (this.length < 2) return this;
  return Math.floor(this.reduce((a, b) => a + b) / this.length);
};

Array.prototype.sum = function () {
  return this.reduce((a, b) => a + b);
};

Array.prototype.even = function () {
  return this.filter((item) => item % 2 === 0);
};

Array.prototype.odd = function () {
  return this.filter((item) => item % 2 !== 0);
};
//console.log(testArr.average());

//  kata 20 (Valid Parentheses) Level 5
/**
* @param {string} parens
* @return {boolean}
* func ('()()') - > true
* func ('(()()') - > false
*/

function validParenthesesBad(parens) {
  if (parens.length === 0) return true;
  const leftArr = parens.match(/\(/gi);
  const rightArr = parens.match(/\)/gi);

  if (!leftArr && !rightArr) return true;
  if (!leftArr || !rightArr) return false;
  return leftArr.length === rightArr.length;
}

function validParenthesesOpt(parens){
  let n = 0;
  for (var i = 0; i < parens.length; i++) {
    if (parens[i] == '(') n++;
    if (parens[i] == ')') n--;
    if (n < 0) return false;
  }

  return n == 0;
}

// console.log(validParenthesesOpt('()'));
// console.log('false', validParenthesesOpt(')(()))'));
// console.log(validParenthesesOpt('))))'));
// console.log(validParenthesesOpt('32423(sgsdg)'));
// console.log(validParenthesesOpt('(dsgdsg))2432'));
// console.log('true',validParenthesesOpt('adasdasfa'));

//  kata 21 (Detect Pangram) Level 6
/**
* @param {string} sentence
* @return {boolean}
* func("The quick brown fox jumps over the lazy dog.") -> true
*/
//return arr.find((item) => arr.indexOf(item) === arr.lastIndexOf(item));
function isPangram(sentence) {
  const sentenceArr = sentence
                        .toLowerCase()
                        .split('')
                        .sort()
                        .filter((letter) => new RegExp(/[a-z]/).test(letter));

  const set = new Set(sentenceArr);
  if ([...set].length === 26) {
    return true;
  } else {
    return false;
  }
}

function isPangramOpt(sentence) {
  return (sentence.match(/([a-z])(?!.*\1)/ig) || []).length === 26;
}

// console.log(isPangram("The quick brown fox jumps over the lazy dog."));
// console.log(
//   "isPangram",
//   funcSpeed(isPangram("The quick brown fox jumps over the lazy dog."))
// );
// console.log(isPangramOpt("The quick brown fox jumps over the lazy dog."));
// console.log(
//   "isPangramOpt",
//   funcSpeed(isPangramOpt("The quick brown fox jumps over the lazy dog."))
// );

//  kata 22 (Give me a Diamond) Level 6
/**
* @param {number} n
* @return {string}
* func(5) -> "  *\n ***\n*****\n ***\n  *\n"
*/

function diamond(n) {
  if (n % 2 === 0 || n < 1) return null;
  let result = '';
  const middle = Math.floor(n / 2) + 1;
  //console.log(middle)

  for (let i = 1; i <= n; i++) {
    if (i < middle) {
      result += ' '.repeat(middle - i) + '*'.repeat(i + (i - 1)) + ' '.repeat(middle - i) + '\n';
    } else if (i === middle) {
      result += '*'.repeat(n) + '\n';
    } else if (i > middle) {
      result += ' '.repeat(i - middle) + '*'.repeat(n - ((i - middle) * 2)) + ' '.repeat(i - middle) + '\n';
    }
  }

  return result;
}
//console.log(diamond(3));
// console.log(diamond(5));
// console.log(diamond(7));
// console.log()
// console.log(JSON.stringify(diamond(1)));
// console.log(JSON.stringify(diamond(3)));
// console.log(JSON.stringify(diamond(5)));
// console.log(JSON.stringify(diamond(7)));


function diamondOpt(n) {
  if ((n % 2) == 0 || n <= 0) return null;
  let result = '';

  //  +=2 count only odds! (i = 1, i = 3, i = 5, i= 7, i = 9...)
  //  odd iterations only
  //  loop for top lines of diamond (lines above middle)
  for (let i = 1; i < n; i += 2) {

      // two inner loops for each line of top part of diamond
      for (let j = 0; j < (n - i) / 2; j++) result += "o";
      for (let k = 0; k < i; k++) result += "*";
      result += "\n";
  }

  //  middle line of diamond and lines below
  for (let i = n; i > 0; i -= 2) {
      for (let j = 0; j < (n - i) / 2; j++) result += "o";
      for (let k = 0; k < i; k++) result += "*";
      result += "\n";
  }
  return result;
}
// console.log(diamondOpt(3))
// console.log(diamondOpt(5))
// console.log(diamondOpt(7))
// console.log(diamond(9))

//  kata 23 (Count characters in your string) Level 6
/**
  * @param{stribng} str
  * @return {object}
  * f('abc') -> {a: 1, b: 1, c: 1}
*/
function strParser(str) {
  if (str.length === 0) return {};

  let obj = {};

  for (let i = 0; i < str.length; i++) {
    obj[str[i]] = obj[str[i]] ? obj[str[i]] + 1 : 1;
  }

  return obj;
}
//console.log(strParser('aba'));

//  24 (Tortoise racing) Level 6
function catchUp(firstSpeed, secondSpeed, distance) {
  if (firstSpeed > secondSpeed) return null;

  const hour = distance / (secondSpeed - firstSpeed);
  const minutes = Math.floor((hour - parseInt(hour)) * 60);
  const seconds = Math.floor((((hour - parseInt(hour)) * 60) - minutes) * 60);

  return [parseInt(hour), minutes, seconds];
  // let time = distance * 3600 / (secondSpeed - firstSpeed);
  // let hours = time / 3600;
  // time = time % 3600;
  // let minutes = Math.floor(time / 60);
  // let seconds = Math.floor(time % 60);
  //
  // return [parseInt(hours), minutes, seconds];
}
// console.log(catchUp(720, 850, 70))
// console.log(catchUp(80, 91, 37));

function race(v1, v2, g){
  let time=g/(v2-v1);
  return v2>v1 ? [Math.floor(time),Math.floor(time*60%60),Math.floor(time*3600%60)] : null;
}

//  25 (Counting Duplicates) Level 6
function duplicateCount(str) {
  const obj = {};
  const result = [];
  const lowerdStr = str.toLowerCase();

  for (let i = 0; i < lowerdStr.length; i++) {
    obj[lowerdStr[i]] = obj[lowerdStr[i]] ? obj[lowerdStr[i]] + 1 : 1;
  }

  for (let letter in obj) {
    if (obj[letter] > 1) {
      result.push(letter);
    }
  }

  return result.length;
}
console.log(duplicateCount('aabBcde'));

function duplicateCountOpt(text){
  return (text
              .toLowerCase()
              .split('')
              .sort()
              .join('')
              .match(/([^])\1+/g) || []).length;
}
console.log(duplicateCountOpt('aabBcde'));
