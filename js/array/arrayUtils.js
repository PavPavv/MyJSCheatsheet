"use strict";

const arrays = () => {
  const arrSum = (arr) => {
    return arr.reduce((a, b) => a + b);
  };
  //console.log(arrSum([1, 2, 3]))

  const sortArray = () => {
    let arr = [20, 11, 0, 2, -4, 10, 100, 23];
    return arr.sort((a, b) => a - b);
  };
  //console.log(sortArray());

  const getLastElsOf2Arrs = () => {
    let arr1 = [1, 2, 3, 4, 5];
    let arr2 = [0, 1, 3, 4, 5, 6];

    return [arr1[arr1.length - 1], arr2[arr2.length - 1]];
  };
  //console.log(getLastElsOf2Arrs());

  const getUniqueElsOf2Arrs1 = () => {
    let arr1 = [1, 2, 3, 4, 5];
    let arr2 = [0, 1, 3, 4, 5, 6];

    let arr3 = arr2.filter((x) => !arr1.includes(x));
    return arr3;
  };
  //console.log(getUniqueElsOf2Arrs1());

  const getCommonElsOf2Arrs = () => {
    let arr1 = [1, 2, 3, 4, 5];
    let arr2 = [0, 1, 3, 4, 5, 6];

    let arr3 = arr2.filter((x) => arr1.includes(x));
    return arr3;
  };
  //console.log(getCommonElsOf2Arrs());

  const combineNumArraysIntoUniqueOne = () => {
    let arr1 = [1, 2, 3, 4, 5];
    let arr2 = [0, 1, 3, 4, 5, 6];

    return Array.from(new Set([...arr1, ...arr2])).sort((a, b) => a - b);
  };
  //console.log(combineNumArraysIntoUniqueOne());

  const combineStringArraysIntoUniqueOne = () => {
    let arr1 = ["Chelsea", "Arsenal", "MC", "Bayern Munich", "PSG", "Real M"];
    let arr2 = ["Real M", "Barcelona", "CSKA Moscow", "Arsenal"];
    let arr3 = ["Chelsea", "Krasnodar", "MC", "Shakhtar", "Dynamo Kiev", "PSG"];

    return Array.from(new Set([...arr1, ...arr2, ...arr3])).sort(
      (a, b) => a - b
    );
  };
  //console.log(combineStringArraysIntoUniqueOne());

  // Arithmetical mean of an array
  const arMeanArr = () => {
    let arr = [2, 4, 5, 12, 40, 1];
    let result = 0;

    for (let i = 0; i < arr.length; i++) {
      result += arr[i];
    }

    return parseInt(result / arr.length);
  };
  //console.log(arMeanArr())

  const averageArrValue = (arr) => {
    return parseInt(arr.reduce((a, b) => a + b) / arr.length);
  };
  //console.log(averageArrValue([2, 4, 5, 12, 40, 1]));

  // Find central element of an array
  const centralArrayElem = (arr) => {
    return arr[Math.floor((arr.length - 1) / 2)];
  };
  //console.log(centralArrayElem([1, 2, 3, 4, 5]))

  // Find two elements in an array which are equal to a certain number
  const findCouple = (arr, num) => {
    let result = [];

    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] + arr[j] === num) {
          result.push(
            "There are a couple: " +
              arr[i] +
              " and " +
              arr[j] +
              " are equals " +
              num
          );
        }
      }
    }

    if (result) {
      return result;
    } else {
      return "Sorry, there are no matches.";
    }
  };
  let results = findCouple([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 10);
  //for (let i of results) console.log(i)

  // Find black ship
  const findOutlier = (arr) => {
    let oddCount = 0;
    let evenCount = 0;
    let lastOdd;
    let lastEven;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] % 2 == 0) {
        evenCount++;
        lastEven = arr[i];
      } else {
        oddCount++;
        lastOdd = arr[i];
      }

      if (oddCount + evenCount > 3 && oddCount >= 1 && evenCount >= 1) {
        if (oddCount > 1) {
          return lastEven;
        } else {
          return lastOdd;
        }
      }
    }
  };
  //console.log(findOutlier([2, 3, 4, 6, 8, 2, 22, 2]));
  //console.log(findOutlier([3, 1, 55, 31, 44, 21]));

  const findOutlier1 = (numsStr) => {
    const numsArr = numsStr.split(" ").map((x) => x % 2); //  [0,0,0,0,0,0,0,1]
    const arrSum = numsArr.reduce((a, b) => a + b); //  1
    const target = arrSum > 1 ? 0 : 1;

    return numsArr.indexOf(target) + 1;
  };

  //console.log(iqTest1("2 2 2 2 2 2 2 1"));

  //  wrong solution, need to refactor
  // const findException = (arr) => {
  //   const isEven = arr.slice(0, 3).filter((item) => item % 2).length < 1;
  //
  //   for (let item of arr)
  //     if ((isEven && item % 2) || (!isEven && !(item % 2))) return item;
  // };
  //console.log(findException([2, 3, 4, 6, 8, 2, 22, 2]));

  const findSubArray = (arr) => arr.filter((elem) => Array.isArray(elem));
  //console.log(findSubArray(['Portugal', 2, false, {}, 'Romania', ['Chelsea', 'MC'], true, [1, 2, 3, 4, 5, 6], 100]));

  const getMaxSubSum = (arr) => {
    let maxSum = 0;
    let partialSum = 0;

    for (let item of arr) {
      partialSum += item;
      maxSum = Math.max(maxSum, partialSum);
      if (partialSum < 0) partialSum = 0;
    }
    return maxSum;
  };
  //console.log(getMaxSubSum([1, 2, 3, -4]));

  const findElemsBefore = (arr, elem) => {
    let newArr = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === elem) {
        let searched = i;
        newArr = arr.splice(0, searched);
      }
    }
    return newArr;
  };
  //console.log(findElemsBefore(['Chelsea', 'MC', 'Borussia D', 'CSKA', 'Bayern Munich', 'Tottenham'], 'CSKA'))

  // Find a certain array's range, then sort it and then get new array elements sum.
  const arr1 = [8, 1, 2, 3, -100, 400, 5, 6, 7, 20, -20];
  let arr2 = arr1
    .filter((item) => item > 0 && item < 10)
    .sort((a, b) => a - b)
    .reduce((total, item) => total + item, 0);

  //console.log(arr2);

  // Get data subarrays sum
  const getDataArrSum1 = () => {
    const json = [
      {
        userId: "123456",
        userName: "heisrenard",
        userAge: "27",
        userOnline: "false",
        userTransactionsPerWeek: [
          [100, 200],
          [],
          [11200, 40, 1200, 650, 540, 55, 1000],
          [],
          [1000, 1659, 349, 100],
          [300],
          [39],
        ],
      },
      {
        userId: "7891011",
        userName: "rielkie",
        userAge: "32",
        userOnline: "true",
        userTransactionsPerWeek: [[100, 200], [], [100], [], [1000], [300], []],
      },
    ];

    const arrSum = (arr) => {
      let result = 0;
      for (let i = 0; i < arr.length; i++) {
        result += arr[i];
      }
      return result;
    };

    const subArraysSum = (arr) => {
      let result = 0;

      for (let i = 0; i < arr.length; i++) {
        result += arrSum(arr[i]);
      }
      return result;
    };

    const userTransactionsArr = (data, user) => {
      let userData = data.filter((i) => i.userName === user)[0];
      return userData.userTransactionsPerWeek;
    };

    let user1TransactionsPerWeekArr = userTransactionsArr(json, "heisrenard");
    let user1TransactionsPerWeekSum = subArraysSum(user1TransactionsPerWeekArr);
    console.log(user1TransactionsPerWeekSum);

    let user2TransactionsPerWeekArr = userTransactionsArr(json, "rielkie");
    let user2TransactionsPerWeekSum = subArraysSum(user2TransactionsPerWeekArr);
    console.log(user2TransactionsPerWeekSum);
  };

  //getDataArrSum1()

  const getDataArrSum2 = () => {
    const json = [
      {
        userId: "123456",
        userName: "heisrenard",
        userAge: "27",
        userOnline: "false",
        userTransactionsPerWeek: [
          [100, 200],
          [],
          [11200, 40, 1200, 650, 540, 55, 1000],
          [],
          [1000, 1659, 349, 100],
          [300],
          [39],
        ],
      },
      {
        userId: "7891011",
        userName: "rielkie",
        userAge: "32",
        userOnline: "true",
        userTransactionsPerWeek: [[100, 200], [], [100], [], [1000], [300], []],
      },
    ];

    const userTransactionsArr = (data, user) => {
      let userData = data.filter((i) => i.userName === user)[0];
      return userData.userTransactionsPerWeek;
    };

    const arrSum = (arr) => {
      return arr.reduce((a, b) => a + b, 0);
    };

    const subArrSum = (arr) => {
      let result = [];
      for (let subArr of arr) {
        result.push(arrSum(subArr));
      }
      return arrSum(result);
    };

    let user1TransactionsPerWeekArr = userTransactionsArr(json, "heisrenard");
    console.log(subArrSum(user1TransactionsPerWeekArr));
  };

  //getDataArrSum2()

  const fillArrWithElems = (nums, elem) => {
    return new Array(nums).fill(elem);
  };
  //console.log(fillArrWithElems(9, { "Test": "test" }));

  const checkSubStr = (str, target) => {
    return str.toLowerCase().includes(target);
  };
  //console.log(checkSubStr('Hi there, yo !', 'yo'));

  const changeMidArrElem = (arr, elem) => {
    arr[Math.floor((arr.length - 1) / 2)] = elem;
    return arr;
  };
  //console.log(changeMidArrElem(['Arsenal', 'Tottenham', 'Chelsea', 'MU', 'MC'], 'KS'));

  const camelize = (str) => {
    return str
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join("");
  };
  //console.log(camelize('some-kind-of-monster'));

  const filterRange = (arr, a, b) => {
    return arr.splice(a, b - a - 1);
  };
  //console.log(filterRange([1, 2, 3, 4, 5, 6, 7, 8, 9], 3, 7));

  const filterRange1 = (arr, a, b) => {
    return arr.filter((item) => a <= item && item <= b);
  };
  //console.log(filterRange1([1, 2, 3, 4, 5, 6, 7, 8, 9], 3, 7));

  const fisherYatesShuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i

      // перетасовка
      // с деструктуризацией было бы так: [arr[i], arr[j]] = [arr[j], arr[i]];
      let t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }

    return arr;
  };

  const testShuffle = (arr) => {
    let newArr = fisherYatesShuffle(arr);
    return newArr[0];
  };
  console.log(testShuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]));
};
arrays();
