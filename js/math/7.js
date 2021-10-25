"use strict";
//  1
// ax = b (линейное уравнение с 1 переменной)
function linear(a, b) {
  if (a === 0 || b === 0) return;
  return b / a;
}

//console.log(linear(4, 0));
////////////////////////////////////////////////////////////////////////////////

//  2
//  Сотставить уравнение
//  Привести его к виду линейного уравненияи с 1 переменной

/*
  C двух деревьев собрали 65,4 кг вишен, причём с одного дерева собрали на
  12,6 кг меньше, чем со второго. сколько кг вишен собрали с каждого дерева?
*/
//console.log(problem1(12.6, 65.4));

/*
  Наташа купила 24 тетради, причём тетрадей в клетку она купила на 4 меньше,
  чем тетрадей в линейку. Сколько тетрадей в линейку купила Наташа?
*/

/**
  @param {number} a
  @param {number} b
  @return {Array}
*/

function problem1(a, b) {
  if (a === 0 || b === 0) return `Error!`;
  const x = (b - a) / 2;
  const y = x + a;
  return [x.toFixed(1), y.toFixed(1)];
}

//console.log(problem1(6, 24));
////////////////////////////////////////////////////////////////////////////////

//  3
/**
  @param {number} totalSum
  @param {number} totalQty
  @param {number} a
  @param {number} b
  @return {string}
*/
// Для школьной библиотеки приобрели 50 орфографических и толковых словарей
// русского языка на общую сумму 11 000 р. Cколько было куплено словарей каждого
// вида,если орфографический стоит 200 р.,а толковый 250 р.?

function getEachOfTwoParamsAmount(totalSum, totalQty, a, b) {
  const x = (totalSum - totalQty * b) / (a - b);
  const y = totalQty - x;
  return `param a is ${x} and param b is ${y}`;
}

//console.log(getEachOfTwoParamsAmount(11000, 50, 200, 250));
////////////////////////////////////////////////////////////////////////////////

//  4
/**
  @param {number} down
  @param {number} up
  @param {number} additional
  @return {number}
*/

//  Некоторое число сначала уменьшили на 10 %, а потом результат увеличили на 20 %.
//  После этого получили число, которое на 48 больше данного. Найдите данное число.
function getDownUpAddNum(down, up, additional) {
  //  1% === 0.01; 10% === 0.1; 100% === 1
  if (down <= 0 || up <= 0) return "stopped";
  if (down > 1 || up > 1) return "stopped";
  if (additional < 0) return "stopped";

  const initialX = 1;
  const downPercentage = 1 - down;
  const upPercentage = 1 + up;
  const x =
    additional /
    (downPercentage.toFixed(1) * upPercentage.toFixed(1) - initialX);
  return Math.ceil(parseInt(x)) + 1;
}

//console.log(getDownUpAddNum(0.1, 0.2, 48));
////////////////////////////////////////////////////////////////////////////////

//  Одночлены
function monomials() {
  const b = 3;
  let one = -3 * b;
  let commonFraction = 1 / 2;
}
//monomials();

//  Многочлены
function polynomials() {
  const a = 10;
  const b = 1 / 12;
  let poly = 7 * a * b + b - 11;
}

//  Найти все двузначные числа, равные произведению своих цифр, величенных на 1.
/**
  * @param {number} num
  * @return {boolean}
*/
function getNumsOfNumber(num) {
  const numbersArr = parseInt(num).toString().split("").map(Number);

  if ((numbersArr[0] + 1) * (numbersArr[1] + 1) === num) {
    return true;
  }

  return false;
}

//console.log(getNumsOfNumber(35));

/**
  * @param {function} f
  * @return {array}
*/
function findN(f) {
  let result = [];

  for (let i = 10; i < 100; i++) {
    if (f(i)) {
      result.push(i);
    }
  }
  return result;
}
//console.log(findN(getNumsOfNumber));
////////////////////////////////////////////////////////////////////////////////

/**
  * @param {number} num
  * @return {boolean}
*/
//  Найти двузначное число, в котором цифра десятков на 4 больше цифры едениц,
//  а разность между данным числом и числом, записанным теми жи цифрами, но в
//  обратном порядке, равна 27.
function getStrangeNumber(num) {
  const numbersArr = parseInt(num).toString().split("").map(Number);

  if (numbersArr[0] + 4 === numbersArr[1]) {
    if (num - Number(num.toString().split("").reverse().join("")) === 27) {
      return true;
    }
  }

  return false;
}

//console.log(findN(getStrangeNumber));
////////////////////////////////////////////////////////////////////////////////
/*
Семья полодила в банк 100 000р. под 10% годовых. Тогда через год величина M -
сумма денег на счете - станет равной M = 100 000 + (100 000 * 0,1) = 110 000 р.
*/
/**
  * @param {number} money
  * @param {number} per
  * @param {number} years
  * @return {number}
*/
function getBankPercents(money, per, years) {
  if (money < 0) return 0;
  if (per < 0 || per > 1) return money;
  if (years < 0) return money;

  let acc = money;

  function getNewBankSum(m, p) {
    return m + (m * p);
  }

  for (let i = 0; i < parseInt(years); i++) {
    let temp = getNewBankSum(acc, per);
    acc = temp;
  }

  return parseInt(acc);
}

// console.log(getBankPercents(100000, 0.1, 1));
// console.log(getBankPercents(100000, 0.1, 2));
// console.log(getBankPercents(100000, 0.1, 3));
// console.log(getBankPercents(100000, 0.1, 4));
// console.log(getBankPercents(100000, 0.1, 5));
// console.log(getBankPercents(100000, 0.1, 10));
////////////////////////////////////////////////////////////////////////////////

/*
В цистерне было 300 л воды. Через открытый кран каждую минуту из цистерны выливается
2 л воды.
*/
/**
  * @param {number} initialValue
  * @param {number} consumption
  * @param {number} minute
  * @return {}
*/
function getWaterAmountInPreciseMinute(initialValue, consumption, minute) {
  if (initialValue < 0) return 0;
  if (consumption < 0 || minute < 0) return initialValue;

  const result = initialValue - (consumption * minute);

  if (result < 0) return 0;

  return result;
}
// console.log(getWaterAmountInPreciseMinute(300, 2, 12));
// console.log(getWaterAmountInPreciseMinute(300, 2, 180));

//  Определить по входным параметрам, какая будет прямая у графика этой функции,
//  горизонтальная или нет, обратнопропорциональная или нет.
//  y = kx + b - линейная функция
//  если в y = kx + b, b === 0 -> y = kx, где k !== 0 - прямая пропорциональность
//  если в y = kx + b, k === 0 -> y = b, это горизонтальная функция, график параллелен оси абсцисс (оси x)

function linearType(k, b) {
  if (b === 0) return 'cross center function graph';
  if (k === 0) return 'horizontal function graph';

  return 'linear function graph';
}
//console.log(linearType(0, 2));
