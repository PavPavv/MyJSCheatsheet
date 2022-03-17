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
      alert("Name is too short, need at least 4 characters");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

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

A **Promise* is in one of these states:
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
**rejectionhandled**
- Sent when a promise is rejected, after that rejection has been handled by the executor's reject function.

**unhandledrejection**
- Sent when a promise is rejected but there is no rejection handler available.

In both cases, the event (of type **PromiseRejectionEvent**) has as members a promise property indicating the promise that was rejected, and a reason property that provides the reason given for the promise to be rejected.

One case of special usefulness: when writing code for Node.js, it's common that modules you include in your project may have unhandled rejected promises, logged to the console by the Node.js runtime. You can capture them for analysis and handling by your code—or just to avoid having them cluttering up your output—by adding a handler for the Node.js unhandledRejection event (notice the difference in capitalization of the name), like this:

```javascript
process.on("unhandledRejection", (reason, promise) => {
  /* You might start here by adding code to examine the
   * "promise" and "reason" values. */
});
```
However, if you add that process.on listener but don't also have code within it to handle rejected promises, they will just be dropped on the floor and silently ignored. So ideally, you should add code within that listener to examine each rejected promise and make sure it was not caused by an actual code bug.
Luckily we can wrap setTimeout in a promise. Best practice is to wrap problematic functions at the lowest possible level, and then never call them directly again:
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