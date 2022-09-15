/////////////////////////////////////// SEARCH //////////////////////////////////////////////

//  Linear search
const arr = [1,2,3,4,5];

function linearSearch(a, x) {
  let i = 0;
  while (i < a.length && a[i] !== x) {
    i++;
  }
  return i;
}
//  console.log(linearSearch(arr, 4));

//-----------------------------------------------------

//  Linear search with barrier
function linearSearch(a, x) {
  const N = a.length;
  a[N] = x;
  let i = 0;
  while (a[i] !== x) {
    i++;
  }
  if (i === N) return 0;
  return i;
}
// console.log(linearSearch(arr, 4));

//-----------------------------------------------------

//  Binary search
function bSearch(a, x) {
  const N = a.length;
  let l = 0;
  let r = N - 1;
  while(l < r) {
    let m = Math.floor((l + r) / 2);
    if (a[m] < x) l = m + 1;
    else r = m;
  }
  return l;
};
console.log(bSearch(arr, 4));

//-----------------------------------------------------

//  Array (table) search

//  string search
//  simple string search

// my solution
const s =  [';', 't', 't', ' ', 'o', 'n', 'e', ' ', 'o', 'r', ' ', 't', 'w', 'o', '.']; // text
const p = ['t', 'w', 'o']; //  target

function wordSearch(textArr, wordArr) {
  let counter = 0;
  let result = -1;

  for (let i = 0; i < textArr.length; i++) {
    const textChar = textArr[i];
    
    for (let j = 0; j < wordArr.length; j++) {
      const wordChar = wordArr[j];

      if (wordChar === textChar) {
        //  first char of the target
        if (counter === 0) counter++;
        else {
          if (wordArr[counter] === textChar) {
            counter++;
            result = i - (wordArr.length - 1);
          }
        }
      }
    }
  }
  return result;
}
console.log(wordSearch(s, p));
console.log(s[wordSearch(s, p)]);

console.log(wordSearch(s, ['o','n','e']));
console.log(s[wordSearch(s, ['o','n','e'])]);

/**
 * 
 * @param {number} i
 * @return {boolean} 
 */
function r(i) {
  let j;
  return true;
}