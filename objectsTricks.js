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
      console.log(key); //  genres
      console.log("------------------------------");
      if (Array.isArray(myFavoriteAuthors["allAuthors"][key])) {
        const array = myFavoriteAuthors["allAuthors"][key];

        for (let value of array) {
          temp.push(value);
        }
      }
    }
    //  authors
    console.log(temp); // array
    console.log(...temp); //  strings
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

  console.log(myFavoriteAuthors.getAllAuthors());
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

    // Old 'by hand' technique
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
      //console.log(genresVals);

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

          const doNotHaveMoreGenres = !(currentGenreIndex < genresVals.length);
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
