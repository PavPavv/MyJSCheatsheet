'use strict';
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
  setTimeout(() => {
    console.log('setTimeout')
  }, 0);


  let p = new Promise((resolve, reject) => {
    console.log('create promise');
    resolve();
  });

  p.then(() => {
    console.log('handling promise')
  });

  console.log('clg');
};
//queues();
//////////////////////////////////////////////////////////////////

// 3
/* 
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
  /* 
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
/*
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
/*
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
/*
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
/*
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
/*
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
  return `${a} ${b} ${c} ${d}`;
};
// console.log(varTest());

// 15
const varTest1 = () => {
  let a = 2;
  let x = 1 + (a *= 2);
  return `${a} ${x}`;
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

  return `${a} ${b} ${c} ${d} ${e} ${f} ${g} ${h} ${i} ${j} ${k} ${l} ${m} ${n} ${o}`;
};
console.log(valTest());