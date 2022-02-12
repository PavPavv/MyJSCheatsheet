"use strict";

const objects = () => {
  //  get Object Arrays
  function getObjectArrays() {
    const myFavoriteAuthors = {
      allAuthors: {
        fiction: ["Leo Tolstoy", "Albert Camus", "Jack Kerouac"],
        scienceFiction: ["Oldos Hucksley", "Isaak Asimov"],
        fantasy: ["J.R.R. Tolkien"],
      },
    };

    function getObjArrs() {
      let temp = [];
      for (let key in myFavoriteAuthors["allAuthors"]) {
        //console.log(key); //  genres
        console.log("------------------------------");
        if (Array.isArray(myFavoriteAuthors["allAuthors"][key])) {
          const array = myFavoriteAuthors["allAuthors"][key];

          for (let value of array) {
            temp.push(value);
          }
        }
      }
      //  authors
      //console.log(temp); // array
      //console.log(...temp); //  strings
    }
    getObjArrs();
  }
  //getObjectArrays();

  //  get Object arrays by internal method
  function getObjectArraysByInnerMethod() {
    const myFavoriteAuthors = {
      allAuthors: {
        fiction: ["Leo Tolstoy", "Albert Camus", "Jack Kerouac"],
        scienceFiction: ["Oldos Hucksley", "Isaak Asimov"],
        fantasy: ["J.R.R. Tolkien"],
      },

      getAllAuthors() {
        //  version 2
        const test = Object.values(this.allAuthors).reduce(
          (a, b) => a.concat(b),
          []
        );
        return test;
      },
    };

    //console.log(myFavoriteAuthors.getAllAuthors());
  }
  //getObjectArraysByInnerMethod();

  //  Symbol.iterator will return an object called an iterator. This iterator will
  //  have a method called next which will return an object with keys value and done.
  function symbolIterator() {
    const myFavoriteAuthors = {
      allAuthors: {
        fiction: ["Leo Tolstoy", "Albert Camus", "Jack Kerouac"],
        scienceFiction: ["Oldos Hucksley", "Isaak Asimov"],
        fantasy: ["J.R.R. Tolkien"],
      },

      // Old 'by hand' technique (bad solution)
      // getAllAuthors() {
      //   const authors = [];
      //
      //   for (const author of this.allAuthors.fiction) {
      //     authors.push(author);
      //   }
      //
      //   for (const author of this.allAuthors.scienceFiction) {
      //     authors.push(author);
      //   }
      //
      //   for (const author of this.allAuthors.fantasy) {
      //     authors.push(author);
      //   }
      //
      //   return authors;
      // }

      [Symbol.iterator]() {
        //  Get all the authors in an array
        const genresVals = Object.values(this.allAuthors);
        //console.log(genresVals); // [ [], [], [] ]

        //  Store the current genre and author index
        let currentAuthorIndex = 0;
        let currentGenreIndex = 0;

        return {
          // Implementation of next()
          next() {
            //  authors according to current genre index
            const authors = genresVals[currentGenreIndex];
            //console.log('authors', authors);

            // doNotHaveMoreAuthors is true when the authors array is exhausted.
            // That is, all items are consumed.

            const doNotHaveMoreAuthors = !(currentAuthorIndex < authors.length);
            if (doNotHaveMoreAuthors) {
              // When that happens, we move the genre index to the next genre
              currentGenreIndex++;
              // and reset the author index to 0 again to get new set of authors
              currentAuthorIndex = 0;
            }
            // if all genres are over, then we need tell the iterator that we
            // can not give more values.

            const doNotHaveMoreGenres = !(
              currentGenreIndex < genresVals.length
            );
            if (doNotHaveMoreGenres) {
              // Hence, we return done as true.
              return {
                value: undefined,
                done: true,
              };
            }

            // if everything is correct, return the author from the
            // current genre and incerement the currentAuthorindex
            // so next time, the next author can be returned.
            return {
              value: genresVals[currentGenreIndex][currentAuthorIndex++],
              done: false,
            };
          },
        };
      },
    };

    for (const author of myFavoriteAuthors) {
      //console.log(author);
    }

    //console.log(...myFavoriteAuthors);

    //  Not a solid technique of mine
    // for (let item in myFavoriteAuthors) {
    //   console.log(myFavoriteAuthors[item]);
    // }
  }
  //symbolIterator();

  // Find number of repetitions of the substring
  const countSameLetters = (str) => {
    return [...str].reduce(
      (res, char) => ((res[char] = (res[char] || 0) + 1), res),
      {}
    );
  };
  //console.log(countSameLetters('test'))

  const data = [
    { name: "Joe", date: "2018-07-01", amt: 250 },
    { name: "Mars", date: "2018-07-01", amt: 250 },
    { name: "Joe", date: "2018-07-02", amt: 250 },
    { name: "Saturn", date: "2018-07-01", amt: 250 },
    { name: "Joe", date: "2018-07-02", amt: 250 },
    { name: "Jupiter", date: "2018-07-01", amt: 250 },
  ];

  const getMainKeys = Object.keys(Object.assign({}, ...data));
  //console.log("getMainKeys", getMainKeys);

  const getVals1 = data.map((item) => item.name);
  //console.log('getVals1', getVals1)
  const getUniqueObjVals = [
    ...new Set(
      data.map((obj) => {
        return obj.name;
      })
    ),
  ];
  //console.log('getUniqueObjVals', getUniqueObjVals)

  const isEmptyObj = (obj) => {
    return Object.keys(obj).length ? false : true;
  };
  //console.log(isEmptyObj({}));

  //
  const objScope = () => {
    function testThis() {
      return this;
    }
    //console.log(testThis()) // undefined

    function testThis1() {
      return {
        a: "a",
        test: this,
      };
    }
    console.log(testThis1.a); // undefined

    function testThis2() {
      return {
        a: "a",
        test: this,
      };
    }
    let test2 = testThis2(); // test2 = {a: 'a', test: this}
    //console.log(test2); // {a: 'a', test: this}
    //console.log(test2.a) // a
    //console.log(test2.test) // undefined

    function testThis3() {
      return {
        name: "Джон",
        test() {
          return this;
        },
      };
    }
    let test3 = testThis3(); // test3 = { name: 'Джон', test: [Function: test] }
    //console.log(test3); // { name: 'Джон', test: [Function: test] }
    //console.log(test3.name) // 'Джон'
    //console.log(test3.test) // [Function: test]
    //console.log(test3.test()); // { name: 'Джон', test: [Function: test] }
    //console.log(test3.test().name) // 'Джон'
  };
  objScope();

  const one = { id: 1, name: "Paul", surname: "Kemp", age: 27 };
  const two = { id: 2, name: "Andrei", surname: "Platonov", age: 32 };
  const three = { id: 3, name: "Alex", surname: "Ferguson", age: 30 };

  const users = [one, two, three];
  //console.log(users)
  const names = users.map((item) => item.name);
  //console.log(names);
  const usersMapped = users.map((item) => ({
    id: item.id,
    fullName: `${item.name} ${item.surname}`,
  }));
  //console.log(usersMapped);
  const usersByAge = users.sort((a, b) => a.age - b.age);
  //console.log(usersByAge);

  const getAverageAge = (usersObjArr) => {
    return parseInt(
      usersObjArr.reduce((prev, user) => prev + user.age, 0) / users.length
    );
  };

  //console.log(getAverageAge([one, two, three]));
};

objects();
