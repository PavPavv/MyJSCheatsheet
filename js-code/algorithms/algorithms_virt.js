///////////////////////////////////////  SEARCH

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

//  array (table) search

//  string search
//  simple string search
const s = ['o', 'n', 'e']; // text
const p = ['n', 'e']; //  target
/**
 * 
 * @param {number} i
 * @return {boolean} 
 */
function r(i) {
  let j;
  return true;
}