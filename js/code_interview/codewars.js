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

//  kata 1
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

//  kata 2

/**
 * @param {number} num
 * @return {number}
 * func(10) -> -10;
 */
function makeNegative(num) {
  return num < 0 ? num : num * -1;
}

//console.log(makeNegative(0.12));

//  kata 3
/**
 * @param {string[]} friends
 * @return {string[]}
 * func(["Mark", "John", "Sveta", "Maria"]) -> ["Mark", "John"];
 */

function friend(friends) {
  return friends.filter((friend) => friend.length === 4);
}
//console.log(friend(["Mark", "John", "Sveta", "Maria"]));

//  kata 4
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

//  kata 5
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

//  kata 6
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

//  kata 7
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

//  kata 8
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

//  kata 9
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

//  kata 9
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

//  kata 10
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

//  kata 11 (Find the odd int)
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

//  kata 12 (Persistent Bugger)
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

//  kata 13 (Write Number in Expanded Form)
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

//  kata 14 (Find the unique number)
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

// kata 15 (Format a string of names like 'Bart, Lisa & Maggie')
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

//  kata 16 (Break camelCase)
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

//  kata 17 (Counting Duplicates)
/**
 * @param {string} str
 * @return {number}
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
console.log("uniqueLettersRepeatCount", uniqueLettersRepeatCount("aabBcde"));
console.log(
  "uniqueLettersRepeatCount",
  funcSpeed(uniqueLettersRepeatCount("aabBcde"))
);

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
console.log("uniqueLettersRepeatCount1", uniqueLettersRepeatCount1("aabBcde"));
console.log(
  "uniqueLettersRepeatCount1",
  funcSpeed(uniqueLettersRepeatCount1("aabBcde"))
);

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
console.log(
  "uniqueLettersRepeatCountOpt",
  uniqueLettersRepeatCountOpt("aabBcde")
);
console.log(
  "uniqueLettersRepeatCountOpt",
  funcSpeed(uniqueLettersRepeatCountOpt("aabBcde"))
);
