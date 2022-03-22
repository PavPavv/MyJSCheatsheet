# Interview questions (middle)

## 1. Ways to define property on an object

1. **get** **set** internal methods

```javascript
const user = {
  firstName: "Albert`",
  surname: "Camus",
  set n(name) {
    this.firstName = name;
  },
  get nameN() {
    return this.firstName;
  },
};

user.getFullName = function () {
  return `${this.firstName} ${this.surname}`;
};

console.log(user.firstName); // 'Albert'
user.n = "Pavel";
console.log(user.nameN); // 'Albert'
console.log(user.getFullName()); // 'Albert Camus'
```

2. **defineProperty()**

```javascript
const user = {
  firstName: "Paul",
  surname: "Durnov",
  set n(name) {
    this.firstName = name;
  },
  get nameN() {
    return this.firstName;
  },
};

Object.defineProperty(user, "getFullName", {
  get: function () {
    return `${this.firstName} ${this.surname}`;
  },
});

console.log(user.firstName); // 'Paul'
user.n = "Pavel";
console.log(user.nameN); // 'Pavel'
console.log(user.getFullName); // 'Pavel Durnov'
```

The static method Object.**defineProperty()** defines a new property directly on an object, or modifies an existing property on an object, and returns the object.
By default, values added using Object.**defineProperty()** are immutable and not enumerable.

Property descriptors:
1. data descriptor
2. accessor descriptor

**configurable**
**true** if the type of this property descriptor may be changed and if the property may be deleted from the corresponding object. Defaults to **false**.

**enumerable**
**true** if and only if this property shows up during enumeration of the properties on the corresponding object. Defaults to **false**.

#### Data descriptor
**value**
The value associated with the property. Can be any valid JavaScript value (number, object, function, etc). Defaults to **undefined**.

**writable**
**true** if the value associated with the property may be changed with an assignment operator. Defaults to **false**.

#### Accessor descriptor
**get**
A function which serves as a getter for the property, or **undefined** if there is no getter. When the property is accessed, this function is called without arguments and with this set to the object through which the property is accessed (this may not be the object on which the property is defined due to inheritance). The return value will be used as the value of the property. Defaults to **undefined**.

**set**
A function which serves as a setter for the property, or **undefined** if there is no setter. When the property is assigned, this function is called with one argument (the value being assigned to the property) and with **this** set to the object through which the property is assigned. Defaults to **undefined**.

If a descriptor has neither of value, writable, get and set keys, it is treated as a data descriptor. If a descriptor has both [**value** or **writable**] and [**get** or **set**] keys, an exception is thrown.
```javascript
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      console.log("Name is too short, need at least 4 characters");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
console.log(user.name); // Pete

user.name = ""; // Name is too short...
```

Bear in mind that these attributes are not necessarily the descriptor's own properties. Inherited properties will be considered as well. In order to ensure these defaults are preserved, you might **freeze** the Object upfront, specify all options explicitly, or point to null with **Object.create(null)**.

```javascript
// Example of an object property added
// with defineProperty with an accessor property descriptor
var bValue = 38;
Object.defineProperty(o, 'b', {
  // Using shorthand method names (ES2015 feature).
  // This is equivalent to:
  // get: function() { return bValue; },
  // set: function(newValue) { bValue = newValue; },
  get() { return bValue; },
  set(newValue) { bValue = newValue; },
  enumerable: true,
  configurable: true
});
o.b; // 38
// 'b' property exists in the o object and its value is 38
// The value of o.b is now always identical to bValue,
// unless o.b is redefine
```

## 2. The Execution Context And The Call Stack
The execution context is a wrapper around the currently executing code. It consists of the following:
1. The **this** variable. Every execution context provides the **this** variable which refers to an object to which the currently executing code belongs.
2. The variable environment — a place in memory where variables lives and how they relate with each other. Each execution context has its variable environment.
3. The outer environment. When we execute code within a function the outer environment is the code outside of that function — at the global level, it is **null**.

When the JavaScript engine starts executing our code, a base execution context — the global execution context is created. Also, anytime a function is invoked a new execution context is created and placed on top of the stack. And when a function returns its execution context is popped off the call stack. This stack of the execution contexts that are created during code execution is called the call stack.

## 3. Promises
The **Promise** object represents the eventual completion (or failure) of an asynchronous operation and its resulting value. Essentially, a **promise** is a returned object to which you attach callbacks, instead of passing callbacks into a function.

A **Promise** is in one of these states:
- **pending**: initial state, neither fulfilled nor rejected.
- **fulfilled**: meaning that the operation was completed successfully.
- **rejected**: meaning that the operation failed.

A pending promise can either be fulfilled with a value or rejected with a reason (error). As the **Promise.prototype.then()** and **Promise.prototype.catch()** methods return promises, they can be chained.

> Promises in JavaScript represent processes that are already happening, which can be chained with callback functions.

The methods **promise.then()**, **promise.catch()**, and **promise.finally()** are used to associate further action with a promise that becomes settled.
The **.then()** method takes up to two arguments; the first argument is a callback function for the resolved case of the promise, and the second argument is a callback function for the rejected case.

Unlike old-fashioned passed-in callbacks:
```javascript
function successCallback(result) {
  console.log("Audio file ready at URL: " + result);
}
function failureCallback(error) {
  console.error("Error generating audio file: " + error);
}
createAudioFileAsync(audioSettings, successCallback, failureCallback);
```
If _createAudioFileAsync()_ were rewritten to return a **promise**, you would attach your callbacks to it instead:
```javascript
createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
```
In the old days, doing several asynchronous operations in a row would lead to the classic callback pyramid of doom:
```javascript
doSomething(function(result) {
  doSomethingElse(result, function(newResult) {
    doThirdThing(newResult, function(finalResult) {
      console.log('Got the final result: ' + finalResult);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```

With modern functions, we attach our callbacks to the returned promises instead, forming a promise chain:
```javascript
doSomething()
.then(function(result) {
  return doSomethingElse(result);
})
.then(function(newResult) {
  return doThirdThing(newResult);
})
.then(function(finalResult) {
  console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);
```

_catch(failureCallback)_ is short for _then(null, failureCallback)_. You might see this expressed with **arrow functions** instead:
```javascript
doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => {
  console.log(`Got the final result: ${finalResult}`);
})
.catch(failureCallback);
```
> Important: Always return results, otherwise callbacks won't catch the result of a previous promise (with arrow functions () => x is short for () => { return x; }).

This symmetry with asynchronous code culminates in the **async/await** syntactic sugar in ECMAScript 2017:
```javascript
async function foo() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch(error) {
    failureCallback(error);
  }
}
```

Whenever a promise is rejected, one of two events is sent to the global scope (generally, this is either the window or, if being used in a web worker, it's the Worker or other worker-based interface).
###### rejectionhandled
- Sent when a promise is rejected, after that rejection has been handled by the executor's reject function.

###### unhandledrejection
- Sent when a promise is rejected but there is no rejection handler available.

In both cases, the event (of type **PromiseRejectionEvent**) has as members a promise property indicating the promise that was rejected, and a reason property that provides the reason given for the promise to be rejected.

One case of special usefulness: when writing code for Node.js, it's common that modules you include in your project may have unhandled rejected promises, logged to the console by the Node.js runtime. You can capture them for analysis and handling by your code—or just to avoid having them cluttering up your output—by adding a handler for the Node.js **unhandledRejection** event (notice the difference in capitalization of the name), like this:

```javascript
process.on("unhandledRejection", (reason, promise) => {
  /* You might start here by adding code to examine the
   * "promise" and "reason" values. */
});
```
However, if you add that **process.on** listener but don't also have code within it to handle rejected promises, they will just be dropped on the floor and silently ignored. So ideally, you should add code within that listener to examine each rejected promise and make sure it was not caused by an actual code bug.

We can wrap **setTimeout** in a promise. Best practice is to wrap problematic functions at the lowest possible level, and then never call them directly again:
```javascript
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
wait(10*1000).then(() => saySomething("10 seconds")).catch(failureCallback);
```
**Promise.resolve()** and **Promise.reject()** are shortcuts to manually create an already resolved or rejected promise respectively. This can be useful at times. **Promise.all()** and **Promise.race()** are two composition tools for running asynchronous operations in parallel.

We can start operations in parallel and wait for them all to finish like this:
```javascript
Promise.all([func1(), func2(), func3()])
.then(([result1, result2, result3]) => { /* use result1, result2 and result3 */ });
```
Sequential composition is possible using some clever JavaScript:
```javascript
[func1, func2, func3].reduce((p, f) => p.then(f), Promise.resolve())
.then(result3 => { /* use result3 */ });

//  Basically, we reduce an array of asynchronous functions down to a promise chain equivalent to:
Promise.resolve().then(func1).then(func2).then(func3);
```

Instead of running immediately, the passed-in function is put on a microtask queue, which means it runs later (only after the function which created it exits, and when the JavaScript execution stack is empty), just before control is returned to the event loop.
Promise callbacks are handled as a Microtask whereas setTimeout() callbacks are handled as Task queues.


##### Promise() constructor
Creates a new Promise object. The constructor is primarily used to wrap functions that do not already support promises.

##### Static methods

- **Promise.resolve(value)** Returns a new Promise object that is resolved with the given value. If the value is a thenable (i.e. has a then method), the returned promise will "follow" that thenable, adopting its eventual state; otherwise, the returned promise will be fulfilled with the value.Generally, if you don't know if a value is a promise or not, **Promise.resolve(value)** it instead and work with the return value as a promise.

- **Promise.reject(reason)** Returns a new Promise object that is rejected with the given reason.

- **Promise.all(iterable)** Wait for all promises to be resolved, or for any to be rejected. If the returned promise resolves, it is resolved with an aggregating array of the values from the resolved promises, in the same order as defined in the iterable of multiple promises. If it rejects, it is rejected with the reason from the first promise in the iterable that was rejected.

- **Promise.allSettled(iterable)** Wait until all promises have settled (each may resolve or reject). Returns a Promise that resolves after all of the given promises is either fulfilled or rejected, with an array of objects that each describe the outcome of each promise.

- **Promise.any(iterable)** Takes an iterable of Promise objects and, as soon as one of the promises in the iterable fulfills, returns a single promise that resolves with the value from that promise.

- **Promise.race(iterable)** Wait until any of the promises is fulfilled or rejected. If the returned promise resolves, it is resolved with the value of the first promise in the iterable that resolved. If it rejects, it is rejected with the reason from the first promise that was rejected.

## 4. Task queues vs microtasks
Promise callbacks are handled as a Microtask whereas setTimeout() callbacks are handled as Task queues.
```javascript
const promise = new Promise(function(resolve, reject) {
  console.log("Promise callback");
  resolve();
}).then(function(result) {
  console.log("Promise callback (.then)");
});

setTimeout(function() {
  console.log("event-loop cycle: Promise (fulfilled)", promise)
}, 0);

console.log("Promise (pending)", promise);

//  1. Promise callback
//  2. "Promise (pending)"
//  3. "Promise callback (.then)"
//  4. "event-loop cycle: Promise (fulfilled)"
```

## 5. Map and WeakMap
Map is a collection of keyed data items, just like an Object. But the main difference is that Map allows keys of any type.

##### Methods and properties are:
- **new Map()** – creates the map.
- **map.set(key, value)** – stores the value by the key.
- **map.get(key)** – returns the value by the key, **undefined** if key doesn’t exist in map.
- **map.has(key)** – returns **true** if the key exists, **false** otherwise.
- **map.delete(key)** – removes the value by the key.
- **map.clear()** – removes everything from the map.
- **map.size** – returns the current element count.

```javascript
let map = new Map();

map.set('1', 'str1');   // a string key
map.set(1, 'num1');     // a numeric key
map.set(true, 'bool1'); // a boolean key

// remember the regular Object? it would convert keys to string
// Map keeps the type, so these two are different:
console.log( map.get(1)   ); // 'num1'
console.log( map.get('1') ); // 'str1'

console.log( map.size ); // 3
```
> As we can see, unlike objects, keys are not converted to strings. Any type of key is possible.

It should be used with map methods: **set**, **get** and so on to assign a value to a key.
Using objects as keys is one of the most notable and important Map features. The same does not count for Object. String as a key in Object is fine, but we can’t use another Object as a key in Object.
```javascript
const city = {
  address: 'Lucky st.',
};
const test = 'test';

const obj = {};
obj[test] = 'what?';
obj[city] = 1;

console.log(obj)  //  {test: 'what?', [object Object]: 1}
```
Every **map.set** call returns the **map** itself, so we can “chain” the calls:
```javascript
map.set('1', 'str1')
  .set(1, 'num1')
  .set(true, 'bool1');
```

For looping over a map, there are 3 methods:

- **map.keys()** – returns an iterable for keys,
- **map.values()** – returns an iterable for values,
- **map.entries()** – returns an iterable for entries [key, value], it’s used by - default in **for..of**.
```javascript
let recipeMap = new Map([
  ['cucumber', 500],
  ['tomatoes', 350],
  ['onion',    50]
]);

// iterate over keys (vegetables)
for (let vegetable of recipeMap.keys()) {
  console.log(vegetable); // cucumber, tomatoes, onion
}

// iterate over values (amounts)
for (let amount of recipeMap.values()) {
  console.log(amount); // 500, 350, 50
}

// iterate over [key, value] entries
for (let entry of recipeMap) { // the same as of recipeMap.entries()
  console.log(entry); // cucumber,500 (and so on)
}
```
> The iteration goes in the same order as the values were inserted. **Map** preserves this order, unlike a regular **Object**. Besides that, **Map** has a built-in **forEach** method, similar to **Array**:

Object to Map:
```javascript
let obj = {
  name: "John",
  age: 30
};
let map = new Map(Object.entries(obj));
console.log( map.get('name') ); // John
```

And array to object:
```javascript
let prices = Object.fromEntries([
  ['banana', 1],
  ['orange', 2],
  ['meat', 4]
]);
// now prices = { banana: 1, orange: 2, meat: 4 }
console.log(prices.orange); // 2
```
We can use **Object.fromEntries** to get a plain object from **Map**:
```javascript
let map = new Map();
map.set('banana', 1);
map.set('orange', 2);
map.set('meat', 4);

let obj = Object.fromEntries(map); // make a plain object

// done!
// obj = { banana: 1, orange: 2, meat: 4 }

console.log(obj.orange); // 2
```

The first difference between **Map** and **WeakMap** is that keys must be objects, not primitive values:
```javascript
let weakMap = new WeakMap();
let obj = {};
weakMap.set(obj, "ok"); // works fine (object key)
// can't use a string as the key
weakMap.set("test", "Whoops"); // Error, because "test" is not an object
```

**WeakMap** does not support iteration and methods **keys()**, **values()**, **entries()**, so there’s no way to get all keys or values from it.

**WeakMap** has only the following methods:
- **weakMap.get(key)**
- **weakMap.set(key, value)**
- **weakMap.delete(key)**
- **weakMap.has(key)**

```javascript
// cache.js
let cache = new WeakMap();

// calculate and remember the result
function process(obj) {
  if (!cache.has(obj)) {
    let result = /* calculate the result for */ obj;

    cache.set(obj, result);
  }

  return cache.get(obj);
}

// main.js
let obj = {/* some object */};

let result1 = process(obj);
let result2 = process(obj);

// ...later, when the object is not needed any more:
obj = null;

// Can't get cache.size, as it's a WeakMap,
// but it's 0 or soon be 0
// When obj gets garbage collected, cached data will be removed as well
```

## 6. Set and WaeakSet
A **Set** is a special type collection – “set of values” (without keys), where each value may occur only once.

Its main methods are:
- **new Set(iterable)** – creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
- **set.add(value)** – adds a value, returns the set itself.
- **set.delete(value)** – removes the value, returns true if value existed at the moment of the call, otherwise false.
- **set.has(value)** – returns true if the value exists in the set, otherwise false.
- **set.clear()** – removes everything from the set.
- **set.size** – is the elements count.
- **set.keys()** – returns an iterable object for values,
- **set.values()** – same as set.keys(), for compatibility with Map,
- **set.entries()** – returns an iterable object for entries [value, value], exists for compatibility with Map.

We can loop over a set either with **for..of** or using **forEach**:
```javascript
let set = new Set(["oranges", "apples", "bananas"]);
for (let value of set) console.log(value);
// the same with forEach:
set.forEach((value, valueAgain, set) => {
  console.log(value);
});
```

```javascript
let set = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

// visits, some users come multiple times
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// set keeps only unique values
console.log( set.size ); // 3

for (let user of set) {
  console.log(user.name); // John (then Pete and Mary)
}
```
Iteration over **Map** and **Set** is always in the insertion order, so we can’t say that these collections are unordered, but we can’t reorder elements or directly get an element by its number.

WeakSet:
- It is analogous to **Set**, but we may only add objects to **WeakSet** (not primitives).
- An object exists in the set while it is reachable from somewhere else.
- Like **Set**, it supports **add**, **has** and **delete**, but not **size**, **keys()** and no iterations.

```javascript
let visitedSet = new WeakSet();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

visitedSet.add(john); // John visited us
visitedSet.add(pete); // Then Pete
visitedSet.add(john); // John again
// visitedSet has 2 users now
// check if John visited?
console.log(visitedSet.has(john)); // true
// check if Mary visited?
console.log(visitedSet.has(mary)); // false
john = null;
// visitedSet will be cleaned automatically
```
WeakMap and WeakSet are used as “secondary” data structures in addition to the “primary” object storage. Once the object is removed from the primary storage, if it is only found as the key of WeakMap or in a WeakSet, it will be cleaned up automatically.