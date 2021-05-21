"use strict";
const script = () => {

  const sortArray = () => {
    let arr = [20, 11, 0, 2, -4, 10, 100, 23];
    arr.sort((a, b) => a - b);
    console.log("sortArray", arr);
  };
  //sortArray();

  const getLastElsOf2Arrs = () => {
    let arr1 = [1, 2, 3, 4, 5];
    let arr2 = [0, 1, 3, 4, 5, 6];

    let arr33 = [arr1[arr1.length - 1], arr2[arr2.length - 1]];
    console.log(arr33);
  };
  //getLastElsOf2Arrs();

  const getUniqueElsOf2Arrs1 = () => {
    let arr1 = [1, 2, 3, 4, 5];
    let arr2 = [0, 1, 3, 4, 5, 6];

    let arr3 = arr2.filter((x) => !arr1.includes(x));
    console.log("getUniqueElsOf2Arrs1", arr3);
  };
  //getUniqueElsOf2Arrs1();

  const combineNumArraysIntoUniqueOne = () => {
    let arr1 = [1, 2, 3, 4, 5];
    let arr2 = [0, 1, 3, 4, 5, 6];

    let arr3 = Array.from(new Set([...arr1, ...arr2])).sort((a, b) => a - b);
    console.log("combineNumArraysIntoUniqueOne", arr3);
  };
  //combineNumArraysIntoUniqueOne();

  const combineStringArraysIntoUniqueOne = () => {
    let arr1 = ["Chelsea", "Arsenal", "MC", "Bayern Munich", "PSG", "Real M"];
    let arr2 = ["Real M", "Barcelona", "CSKA Moscow", "Arsenal"];
    let arr3 = ["Chelsea", "Krasnodar", "MC", "Shakhtar", "Dynamo Kiev", "PSG"];

    let mergedUniqueArr = Array.from(new Set([...arr1, ...arr2, ...arr3])).sort(
      (a, b) => a - b
    );
    console.log("combineStringArraysIntoUniqueOne", mergedUniqueArr);
  };
  //combineStringArraysIntoUniqueOne();

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

  // Find central element of an array
  const centralArrayElem = arr => {
    return arr[Math.floor((arr.length - 1) / 2)];
  };
  //console.log(centralArrayElem([1, 2, 3, 4, 5]))

  // Find two elements in an array which are equal to a certain number
  const findCouple = (arr, num) => {
    let result = [];

    for (let i = 0; i < arr.length; i++) {

      for (let j = i + 1; j < arr.length; j++) {
        if (arr[i] + arr[j] === num) {
          result.push('There are a couple: ' + arr[i] + ' and ' + arr[j] + ' are equals ' + num);
        }
      }
    }

    if (result) {
      return result;
    } else {
      return 'Sorry, there are no matches.';
    }
  }
  let results = findCouple([1, 2, 3, 4, 5, 6, 7, 8, 9, 0], 10);
  //for (let i of results) console.log(i)

};
script();
