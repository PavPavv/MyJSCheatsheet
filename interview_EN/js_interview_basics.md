# Interview questions (basics)

Table of content:

1. Data types
2. Faulsy values
3. Difference between undefined and null
4. Logical operators
5. Type conversions
6. setTimeout() with zero delay
7. Difference between spread and rest operators
8. What is wrapper objects?
9. How to define if a certain property exists on some object?
10. How to create an object in JS?
11. How to copy an object in JS?
12. How to merge objects in JS?
13. What is DOM?
14. What the difference between event.target and event.currentTarget?
15. What the difference between "==" and "===" operators?
16. What is event "bubbling" ?
17. What is "capturing" phase of event?
18. Ways to handle events is JS
19. What is hoisting?
20. Variables and scope (var, let, const)
21. Closure
22. New scope via an IIFE
23. Garbage collector
24. useStrict
25. This
26. Breaking loops in JS
27. Object to primitive conversion
28. Call, apply, bind
29. Nullish coalescing operator (??)
30. Function currying and partial functions
31. Prototype
32. Event loop
33. How JavaScript Event Loop works when executing asynchronous code

## 1. Data types

Primitives:
1.Boolean
2.Number
3.String
4.undefined
5.null
6.Symbol
7.BigInt

Reference type:
1.Object
2.Function type for functions because of the legacy

## 2. Faulsy values

1. false
2. 0
3. -0
4. ''
5. undefined
6. null
7. NaN

## 3. Difference between undefined and null

In JavaScript, **undefined** means a variable has been declared but has not yet been assigned a value. **null** is an assignment value. It can be assigned to a variable as a representation of no value.

## 4. Logical operators

### 4.1 && (AND)

In classical programming, AND returns true if both operands are truthy and false otherwise. AND “&&” finds the first falsy value and returns the last true value before first falsy value.

```javascript
true && console.log("Seen");
```

### 4.2. Logical operators priority

1.!
2.&&
3.||
4.??

## 5. Type conversions

- ToBoolean
- ToString
- ToNumber
- ToPrimitive
- JSON.stringify() - ???

###### ToBoolean

Except 7 falsy values everything else is _true_.
Boolean conversion possible via:

- **Boolean()**
- **!!** (double NOT),
- constructions and loops **if**, **for**, **while**, **do/while**,
- ternary operator **? :**,
- logical operators **&&** (left part) and **||**

###### ToString

**''**, **""**, **``**, stringType + something, **String()**, **toString()**

###### ToNumber

+,-, **Number()**, **parseInt()**

true/false == 1/0\
'' == 0

```javascript
let test = undefined + 5;
console.log(test);
console.log(typeof test);
```

\*Returns **NaN** with a type of **number\***

```javascript
let test = 8 * null;
console.log(test);
console.log(typeof test);
```

\*Returns **0** with a type of **number\***

###### ToPrimitive

valueOf -> toString()

## 6. setTimeout() with zero delay

```javascript
setTimeout(() => {
  console.log("Print something else");
}, 0);
console.log("Print something");
```

Browser engine has some web API, so when engine find some methods of that API, it is marked as asynchronous methods and placed in a call stack after the synchronous tasks.

## 7. Difference between spread and rest operators

When we see **...** in the code, it is either rest parameters or the spread syntax. There’s an easy way to distinguish between them:

- When **...** is at the end of function parameters, it’s “rest parameters” and gathers the rest of the list of arguments into an array.
- When **...** occurs in a function call or alike, it’s called a “spread syntax” and expands an array into a list.

Use patterns:

- Rest parameters are used to create functions that accept any number of arguments.
- The spread syntax is used to pass an array to functions that normally require a list of many arguments.

## 8. What is wrapper objects?

When you interact with a primitive value like it was an object (by calling a method or reading a property from it), JavaScript creates a wrapper object on the fly. You can have access to properties and methods of wrapper objects, like they were regular objects. A wrapper object is disposed right after a single use.

## 9. How to define if a certain property exists on some object?

1.**in** operator

```javascript
const o = {
  prop: "bwahahah",
  prop2: "hweasa",
};
console.log("prop" in o); // true
console.log("prop1" in o); // false
```

2.**hasOwnProperty** method

```javascript
console.log(o.hasOwnProperty("prop2")); // true
console.log(o.hasOwnProperty("prop1")); // false
```

3.array index notation:

```javascript
console.log(o["prop"]); // bwahahah
console.log(o["prop1"]); // undefined
```

**\*in** operator checks if property exist even in prototypes, but **hasOwnProperty** — only in a given object.

## 10. How to create an object in JS?

1.Type constructor (deprecated):

```javascript
const obj = new Object();
obj.name = "Albert";
obj.greeting = function () {
  return `Hi, I'm ${this.name}!`;
};

console.log(obj); // {name: "Albert", greeting: [Function]}
console.log(obj.greeting()); //  'Hi, I'm Albert!
```

2.Object literal (a literal is a notation for representing a fixed value in source code):

```javascript
const obj = {
  name: "Albert",
  greeting() {
    return `Hi, I'm ${this.name}!`;
  },
};
console.log(obj); // {name: "Albert", greeting: [Function: greeting]}
console.log(obj.greeting()); // 'Hi, I'm Albert!'
```

3.Object.create method:

```javascript
const obj = {
  greeting() {
    return `Hi, I'm ${this.name}!`;
  },
};

const o = Object.create(obj);
o.name = "Mark";

console.log(o); //  {name: "Albert"}
console.log(o.greeting()); //  'Hi, I'm Albert!'

//  it is working like:
if (!Object.create) {
	Object.create = function(o) {
		function F(){}
		F.prototype = o;
		return new F();
	};
}

var myObject = Object.create( anotherObject, {
	b: {
		enumerable: false,
		writable: true,
		configurable: false,
		value: 3
	},
	c: {
		enumerable: true,
		writable: false,
		configurable: false,
		value: 4
	}
} );
```

**Object.create(obj)** creates a new object linked to the object we specified, which gives us all the power (delegation) of the **[[Prototype]]** mechanism, but without any of the unnecessary complication of new functions acting as classes and constructor calls, confusing **.prototype** and **.constructor** references, or any of that extra stuff.
The second argument to **Object.create(..)** specifies property names to add to the newly created object, via declaring each new property's property descriptor.

4.Constructor function:

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greeting = function () {
  return `Hi, I'm ${this.name}!`;
};

const albert = new Person("Albert");

console.log(albert); // {name: "Albert"}
console.log(albert.greeting()); // 'Hi, I'm Albert!'
```

5.Class syntax:

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }

  greeting() {
    return `Hi, I\'m ${this.name}`;
  }
}

const albert = new Person("Albert");

console.log(albert); //  {name: "Albert"}
console.log(albert.greeting()); // 'Hi, I'm Albert!'
```

## 11. How to copy an object in JS?

1. Method Object.assign(target):

```javascript
const obj = {
  name: "Paul",
  age: 27,
  favorites: {
    band: "Beirut",
    girls: "brunette",
    car: "Peugeot",
    movies: ["Office", "Ace Ventura", "Under Great White Northern Lights"],
  },
};
const obj1 = Object.assign(obj);
```

but then both objects connected with each other via single link and that means if one object is changed then another one wil be changed too.

2.Spread-operator:

```javascript
const obj = {
  name: "Paul",
  age: 27,
  favorites: {
    band: "Beirut",
    girls: "brunette",
    car: "Peugeot",
    movies: ["Office", "Ace Ventura", "Under Great White Northern Lights"],
  },
};
const obj1 = { ...obj };
```

isolated copies, no link between objects.

3.Methods **JSON.parse(JSON.stringify(obj))**:

```javascript
const obj = {
  name: "Paul",
  age: 27,
  favorites: {
    band: "Beirut",
    girls: "brunette",
    car: "Peugeot",
    movies: ["Office", "Ace Ventura", "Under Great White Northern Lights"],
  },
};
const obj3 = JSON.parse(JSON.stringify(obj2));
```

isolated copies, no link between objects.

## 12. How to merge objects in JS?

1. Object.assign(targetObj, obj1, obj2...):

```javascript
const state = {
  number: 1,
  club: "Arsenal",
};

const newS = {
  year: "2021",
};

const m1 = Object.assign(state, newS);
```

but then both objects connected with each other by a single link and that means if one object is changed then another one wil be changed too.

2.Spread-оператор:

```javascript
const state = {
  number: 1,
  club: "Arsenal",
};

const newS = {
  year: "2021",
};

const m2 = {
  ...state,
  ...newS,
};
```

isolated copies, no link between objects.

3.For a deep copy you need a custom recursive solution:

```javascript
const merge = (...arguments) => {
  // create a new object
  let target = {};

  // deep merge the object into the target object
  const merger = (obj) => {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        if (Object.prototype.toString.call(obj[prop]) === "[object Object]") {
          // if the property is a nested object
          target[prop] = merge(target[prop], obj[prop]);
        } else {
          // for regular property
          target[prop] = obj[prop];
        }
      }
    }
  };

  // iterate through all objects and
  // deep merge them with target
  for (let i = 0; i < arguments.length; i++) {
    merge(arguments[i]);
  }

  return target;
};

const profile = {
  name: "John Doe",
  age: 25,
  address: {
    city: "Berlin",
    country: "DE",
  },
};

const job = {
  profession: "IT Engineer",
  skills: ["JavaScript", "React", "Node"],
};

// perform deep merge
const user = merge(profile, job)
console.log(user);
// {
//     name: 'John Doe',
//     age: 25,
//     address: { city: 'Berlin', country: 'DE' },
//     profession: 'IT Engineer',
//     skills: ['JavaScript', 'React', 'Node']
// }
```

For a variety of reasons, not the least of which is terminology precedent, "inheritance" (and "prototypal inheritance") and all the other OO terms just do not make sense when considering how JavaScript actually works (not just applied to our forced mental models).
Instead, "delegation" is a more appropriate term, because these relationships are not copies but **delegation links**.

## 13. What is DOM?

**Document Object Model**, or **DOM** for short, represents all page content as objects that can be modified. The document object is the main “entry point” to the page. We can change or create anything on the page using it.

According to the Document Object Model (DOM), every HTML tag is an object. Nested tags are “children” of the enclosing one. The text inside a tag is an object as well. All these objects are accessible using JavaScript, and we can use them to modify the page.

## 14. What the difference between event.target and event.currentTarget?

**event.currentTarget** (equals **this** in this case) is the element to which the event handler has been attached, as opposed to **event.target**, which identifies the element on which the event occurred and which may be its descendant.

## 15. What the difference between == and === ?

- The loose equality operator **==** allows us to compare two or more operands by converting their value to a common type first and then checking for the equality between them.

- Strict equality operator **===** allows us to compare two or more operands by checking the equality between the values as well as their types.

## 16. What is event "bubbling" ?

When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors. The most deeply nested element that caused the event is called a target element, accessible as **event.target**.
A bubbling event goes from the target element straight up. Normally it goes upwards till **html**-tag, and then to document object, and some events even reach window, calling all handlers on the path. But any handler may decide that the event has been fully processed and stop the bubbling.
The method for it is **event.stopPropagation()**.

## 17. What is "capturing" phase of event?

The standard DOM Events describes 3 phases of event propagation:

1. Capturing phase – the event goes down to the element.
2. Target phase – the event reached the target element.
3. Bubbling phase – the event bubbles up from the element.

To catch an event on the capturing phase, we need to set the handler capture option to true:

```javascript
elem.addEventListener(..., {capture: true})
// or, just "true" is an alias to {capture: true}
elem.addEventListener(..., true)
```

There are two possible values of the capture option:

- If it’s **false** (default), then the handler is set on the bubbling phase.
- If it’s **true**, then the handler is set on the capturing phase.

## 18. Ways to handle events is JS

There are three ways of event handling:

- HTML attribute: _onclick="..."_.
- DOM-property: _elem.onclick = function_.
- Special methods: _elem.**addEventListener**(event, handler[, phase])_ - to add handler, **removeEventListener** - to remove handler.

No matter how you handle your event, every time it gets as a first argument  **event** object with such properties as **value**, **target**, **currentTarget** etc.

## 19. What is hoisting?

Hoisting is a behavior in JavaScript where variable and function declarations are “hoisted” to the top of their scope before code execution.

```javascript
var myVariable;
console.log(myVariable); // undefine
```

```javascript
var myVariable = 10;
console.log(myVariable); // 10
```

In order to run our code, the JavaScript interpreter takes two passes through the code. On the first pass it looks for variables declared with a **var** keyword and function declarations which it then “hoists” to the top of the scope; only then, on the second pass, does it make assignments and execute the code.
Functions declarations are also “hoisted” to the top of the scope, which means you can call functions before they are declared in your code.

```javascript
hoistMe();

function hoistMe() {
  console.log("I'm a hoisted function.");
}
```

A variable assignment will always take precedence over a function declaration. The internal JavaScript interpreter will always give precedence to a function declaration over **var** declaration.

1. **var** assignment
2. func declaration
3. **var** declaration

```javascript
var test = 'Test'; // var assignment = 'Test'

function test() { // func declaration = ƒ test() { return 'ttttt'; }
  return 'ttttt';
}

var test; // var declaration  = undefined

console.log(test) // 'Test'
```

```javascript
function test() { // func declaration = ƒ test() { return 'ttttt'; }
  return 'ttttt';
}

var test; // var declaration  = undefined

console.log(test) // ƒ test() { return 'ttttt'; }
```

```javascript
var test; // var declaration  = undefined

console.log(test) // undefined
```

## 20. Variables and scope (var, let, const)

A “variable” is just a property of the special internal object, **Environment Record**. “To get or change a variable” means “to get or change” a property of that object.

**let** works similarly to **var**, but the variable **let** declares is block-scoped, it only exists within the current block. **var** is function-scoped. Variables created by **let** are mutable.

```javascript
function order(x, y) {
    if (x > y) { // (A)
        let tmp = x;
        x = y;
        y = tmp;
    }
    console.log(tmp===x); // ReferenceError: tmp is not defined
    return [x, y];
}
```

**const** works like **let**, but the variable you declare must be immediately initialized, with a value that can’t be changed afterward. Constants, variables created by const, are immutable – you can’t assign different values to them.

```javascript
const foo = 'abc';
foo = 'def'; // TypeError
```

**const** only means that a variable always has the same value, but it does not mean that the value itself is or becomes immutable. For example, _obj_ is a constant, but the value it points to is mutable – we can add a property to it.
If you want the value of _obj_ to be immutable, you have to take care of it, yourself. For example, by freezing it:

```javascript
const obj = Object.freeze({});
obj.prop = 123; // TypeError
```

**Object.freeze()** is shallow, it only freezes the properties of its argument, not the objects stored in its properties. 

A variable declared by **let** or **const** has a so-called temporal dead zone (TDZ): When entering its scope, it can’t be accessed (got or set) until execution reaches the declaration.

**var**:

1. When the scope (its surrounding function) of a **var** variable is entered, storage space (a binding) is created for it. The variable is immediately initialized, by setting it to **undefined**.
2. When the execution within the scope reaches the declaration, the variable is set to the value specified by the initializer (an assignment) – if there is one. If there isn’t, the value of the variable remains undefined.

**let**, **conts**

1. When the scope (its surrounding block) of a **let**/**const** variable is entered, storage space (a binding) is created for it. The variable remains uninitialized.
2. Getting or setting an uninitialized variable causes a **ReferenceError**.

**var**-declaring a variable in the head of a **for** loop creates a single binding (storage space) for that variable. Every _i_ in the bodies of the three arrow functions refers to the same binding, which is why they all return the same value:

```javascript
const arr = [];
for (var i=0; i < 3; i++) {
    arr.push(() => i);
}
const a = arr.map(x => x()); // [3,3,3]
```

If you **let**-declare a variable, a new binding is created for each loop iteration:

```javascript
const arr = [];
for (let i=0; i < 3; i++) {
    arr.push(() => i);
}
const a = arr.map(x => x()); // [0,1,2]
```

**const** works like **var**, but you can’t change the initial value of a **const**-declared variable:

```javascript
// TypeError: Assignment to constant variable
// (due to i++)
for (const i=0; i<3; i++) {
    console.log(i);
}
```

###### Common advices about variables in JS:

- Avoiding global variables, hiding variables from global scope
- Creating fresh environments, avoiding sharing
- Keeping global data private to all of a constructor
- Attaching global data to a singleton object
- Attaching global data to a method

## 21. Closure

In JavaScript, every running function, code block {...}, and the script as a whole have an internal (hidden) associated object known as the **Lexical Environment**.

The **Lexical Environment** object consists of two parts:

1. **Environment Record** – an object that stores all local variables as its properties (and some other information like the value of **this**, for example).
2. A reference to the outer lexical environment, the one associated with the outer code.

Algorithm:

1. When the script starts, the **Lexical Environment** is pre-populated with all declared variables.

- Initially, they are in the “Uninitialized” state. That’s a special internal state, it means that the engine knows about the variable, but it cannot be referenced until it has been declared with **let**. It’s almost the same as if the variable didn’t exist.

2.Then phase definition appears. There’s no assignment yet, so its value is **undefined**. We can use the variable from this point forward.
3.phase is assigned a value.
4.phase changes the value.

> “Lexical Environment” is a specification object: it only exists “theoretically” in the language specification to describe how things work. We can’t get this object in our code and manipulate it directly.

A function is also a value, like a variable. The difference is that a **Function Declaration** is instantly fully initialized. During the function call we have two **Lexical Environments**: the inner one (for the function call) and the outer one (global).
When the code wants to access a variable – the inner **Lexical Environment** is searched first, then the outer one, then the more outer one and so on until the global one.
All functions have the hidden property named **[[Environment]]**, that keeps the reference to the **Lexical Environment** where the function was created.

A closure is a function that remembers its outer variables and can access them. In some languages, that’s not possible, or a function should be written in a special way to make it happen. But as explained above, in JavaScript, all functions are naturally closures (there is only one exception, to be covered in The "new Function" syntax).

## 22. New scope via an IIFE

You typically introduce a new scope to restrict the lifetime of a variable. One example where you may want to do so is the “then” part of an if statement: it is executed only if the condition holds; and if it exclusively uses helper variables, we don’t want them to “leak out” into the surrounding scope:

```javascript
function f() {
  if (condition) {
      var tmp = condition.state;
      //  code
  }
  // tmp still exists here
  // => not what we want
}
```

This is a workaround, a simulation of block scoping:

```javascript
function f() {
  if (condition) {
    (function () {  // open block
      var tmp = ...;
      ...
    }());  // close block
  }
}
```

This is Immediately Invoked Function Expression (IIFE):

```javascript
(function () { // open IIFE
  // inside IIFE
}()); // close IIFE
```

You can also enforce the expression context via prefix operators. For example, you can do so via the logical **NOT** operator:

```javascript
!function () { // open IIFE
  // inside IIFE
}(); // close IIFE
```

or via the **void** operator:

```javascript
void function () { // open IIFE
  // inside IIFE
}(); // close IIFE
```

## 23. Garbage collector

In JavaScript object only kept in memory while it’s reachable.
A Lexical Environment object dies when it becomes unreachable (just like any other object). In other words, it exists only while there’s at least one nested function referencing it.

## 24. useStrict

JavaScript's strict mode, introduced in ECMAScript 5, is a way to opt in to a restricted variant of JavaScript, thereby implicitly opting-out of "sloppy mode".

- If a variable is not found anywhere, that’s an error in strict mode (without **use strict**, an assignment to a non-existing variable creates a new global variable, for compatibility with old code).
- **this** default value is **undefined**
- You can not assign to a new property on a non-extensible object
- You can not create functions with **eval()**
- strict mode prohibits **with** statement. (The **with** statement extends the scope chain for a statement.)
- You cannot duplicate parameters
- You can not delete "non-removable" object property
- ...

## 25. This

To access the object, a method can use the **this** keyword. The value of **this** is the object “before dot”, the one used to call the method.
In JavaScript, keyword **this** behaves unlike most other programming languages. It can be used in any function, even if it’s not a method of an object.

In JavaScript **this** is “free”, its value is evaluated at call-time and does not depend on where the method was declared, but rather on what object is “before the dot”. The value of **this** is defined at run-time.

Arrow functions are special: they don’t have their “own” **this** and **arguments** collection. If we reference **this** from such a function, it’s taken from the outer “normal” function.

```javascript
function getCtxName() {
  return this.name;
}
const person = {
  name: 'Paul',
};
const test = getCtxName.bind(person)
console.log(test()) //  Paul
```

## 26. Breaking loops in JS

```javascript
let sum = 0;

while (true) {
  let value = +prompt("Enter a number", '');
  if (!value) break;  //  <<< breaking
  sum += value;
}
```

The **continue** directive is a “lighter version” of **break**. It doesn’t stop the whole loop. Instead, it stops the current iteration and forces the loop to start a new one (if the condition allows).

```javascript
for (let i = 0; i < 10; i++) {
  // if true, skip the remaining part of the body
  if (i % 2 == 0) continue;
  alert(i); // 1, then 3, 5, 7, 9
}
```

```javascript
for (let i = 0; i < 10; i++) {
  if (i % 2) {
    alert( i );
  }
}
```

From a technical point of view, this is identical to the example above. Surely, we can just wrap the code in an **if** block instead of using **continue**.
But as a side-effect, this created one more level of nesting (the alert call inside the curly braces). If the code inside of **if** is longer than a few lines, that may decrease the overall readability.

A **label** is an identifier with a colon(**:**) before a loop:

```javascript
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    let input = prompt(`Value at coords (${i},${j})`, '');
    // if an empty string or canceled, then break out of both loops
    if (!input) break outer; // (*)
    // do something with the value...
  }
}
alert('Done!');
```

In the code above, **break outer** looks upwards for the **label** named _outer_ and breaks out of that loop. So the control goes straight from (*) to _alert('Done!')_. The **continue** directive can also be used with a **label**. In this case, code execution jumps to the next iteration of the labeled loop.

## 27. Object to primitive conversion

Types conversions for **object**

1. All objects are true in a boolean context. There are only numeric and string conversions.
2. The numeric conversion happens when we subtract objects or apply mathematical functions. For instance, **Date** objects can be subtracted, and the result of date1 - date2 is the time difference between two dates.
3. As for the string conversion – it usually happens when we output an object like alert(obj) and in similar contexts.

There are three variants of type conversion, that happen in various situations. They’re called “hints”, as described in the specification:

1. "string"
2. "number"
3. "default"

###### Symbol.toPrimitive

There’s a built-in symbol named **Symbol.toPrimitive** that should be used to name the conversion method, like this:

```javascript
let user = {
  name: "John",
  money: 1000,

  [Symbol.toPrimitive](hint) {
    alert(`hint: ${hint}`);
    return hint == "string" ? `{name: "${this.name}"}` : this.money;
  }
};
```

If the method **Symbol.toPrimitive** exists, it’s used for all hints, and no more methods are needed.

If there’s no **Symbol.toPrimitive** then JavaScript tries to find methods ***toString** and **valueOf**:

- For the “string” hint: **toString**, and if it doesn’t exist, then **valueOf** (so **toString** has the priority for string conversions).
- For other hints: **valueOf**, and if it doesn’t exist, then toString (so valueOf has the priority for maths).

The only mandatory thing: these methods must return a primitive, not an object.
For historical reasons, if **toString** or **valueOf** returns an object, there’s no error, but such value is ignored (like if the method didn’t exist). That’s because in ancient times there was no good “error” concept in JavaScript.
In contrast, **Symbol.toPrimitive** must return a primitive, otherwise there will be an error.

## 28. Call, apply, bind

In JavaScript, everything is an object. So a function in JavaScript is a special object that has all the properties of a normal object and some special hidden properties, such as the code property and an optional name property — functions in JavaScript can be anonymous.
**call**, **apply**, and **bind** are built-in methods in all JavaScript functions.
The call, apply and bind functions are similar in terms that they enable us to set the **this** context. Consequently, they enable us to control the behavior of the **this** variable.

```javascript
function greet() {
  return `Hello ${this.name}`
}
const person = {
  name: "Lawrence Eagles"
};

greet.call(person); // returns Hello Lawrence Eagles
greet.apply(person); // returns Hello Lawrence Eagles

const greet2 = greet.bind(person) // returns a new copy of greet with this binding
greet2() // Hello Lawrence Eagles
```

When the first argument is **null** or **undefined** the **this** variable points to the global object, but in strict mode, it would be **undefined**.
The limitations of **call()** quickly become apparent in cases where we do not know the amount of argument a function would take.
**apply()** shines in this scenario since it takes an array of arguments as its second argument.

The **bind()** method in particular is suited for function currying because it creates a new copy of the function.

```javascript
const multiplyByTwo = multiply.bind(this, 2)
multiplyByTwo(4); // returns 8
const multiplyByTwo(6) // returns 12
```

##### Function borrowing

Method or function borrowing is a way for an object to use the method of another object without redefining that method. This pattern allows an object to borrow the methods of other objects without inheriting their properties and methods.

Function borrowing allows us to use the methods of one object on a different object without having to make a copy of that method and maintain it in two separate places. It is accomplished through the use of **.call()**, **.apply()**, or **.bind()**, all of which exist to explicitly set **this** on the method we are borrowing.

```javascript
const Vehicle = {
  name: 'Vehicle',
  type: 'vehicle',
  start: function() { 
      return `starting the ${this.name} ${this.type}`
  },
  stop: function() {
      return `stopped the ${this.name} ${this.type}`
  }
};

const car = { name: 'Toyota', type: 'car' }
Vehicle.start.call(car) // returns starting the car Toyota
Vehicle.stop.call(car) // stopped the Toyota car

function test(a, b) {
  return Array.prototype.slice.call(arguments).sort();
};

console.log(test('match','ball')); //   ['ball', 'match']
```

The most important practical application of function borrowing pertains to native methods, and specifically, to **Array.prototype.slice**. There are several list-like data structures that aren’t arrays, and it’s useful to be able to treat them as arrays and operate on them as such. One of the most prevalent list-like data structures that isn’t an array is arguments. The arguments object represents all the parameters passed in to a given (non-arrow) function.

## 29. Nullish coalescing operator (??)

is a logical operator that returns its right-hand side operand when its left-hand side operand is **null** or **undefined**, and otherwise returns its left-hand side operand.

```javascript
const test = null || 'default string';

const foo = null ?? 'default string';
console.log(foo);
// expected output: "default string"
```

Due to **||** being a boolean logical operator, the left hand-side operand was coerced to a boolean for the evaluation and any falsy value (0, '', **NaN**, **null**, **undefined**) was not returned. This behavior may cause unexpected consequences if you consider 0, '', or **NaN** as valid values.

It is not possible to combine both the AND (**&&**) and OR operators (**||**) directly with **??**!
However, providing parenthesis to explicitly indicate precedence is correct:

```javascript
(null || undefined) ?? "foo"; // returns "foo"

let foo = { someFooProp: "hi" };
console.log(foo.someFooProp?.toUpperCase() ?? "not available"); // "HI"
```

## 30. Function currying and partial functions

Currying is an advanced technique of working with functions. It’s used not only in JavaScript, but in other languages as well.
Currying is a transformation of functions that translates a function from callable as _f(a, b, c)_ into callable as _f(a)(b)(c)_.
Currying doesn’t call a function. It just transforms it.

```javascript
function curry(f) { // curry(f) does the currying transform
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3
```

or in ES6 syntax:

```javascript
const sum = (a, b) => a + b;
const curryIt = (f) => (a) => (b) => f(a,b);
const curriedSum = curryIt(sum);
console.log(curriedSum(1)(2)); // 3
```

```javascript
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}

function sum(a, b, c) {
  return a + b + c;
}
let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6, still callable normally
alert( curriedSum(1)(2,3) ); // 6, currying of 1st arg
alert( curriedSum(1)(2)(3) ); // 6, full currying
```

## 31. Prototype

Objects in JavaScript have an internal property, denoted in the specification as **[[Prototype]]**, which is simply a reference to another object. Almost all objects are given a non-**null** value for this property, at the time of their creation.
The default **[[Get]]** operation proceeds to follow the **[[Prototype]]** link of the object if it cannot find the requested property on the object directly. This process continues until either a matching property name is found, or the **[[Prototype]]** chain ends. If no matching property is ever found by the end of the chain, the return result from the **[[Get]]** operation is **undefined**.

1. If a normal data accessor property named _foo_ is found anywhere higher on the **[[Prototype]]** chain, and it's not marked as read-only (**writable:false**) then a new property called _foo_ is added directly to _myObject_, resulting in a shadowed property.
2. If a _foo_ is found higher on the **[[Prototype]]** chain, but it's marked as read-only (**writable:false**), then both the setting of that existing property as well as the creation of the shadowed property on _myObject_ are disallowed. If the code is running in strict mode, an error will be thrown. Otherwise, the setting of the property value will silently be ignored. Either way, no shadowing occurs.
3. If a _foo_ is found higher on the **[[Prototype]]** chain and it's a setter, then the setter will always be called. No _foo_ will be added to (aka, shadowed on) _myObject_, nor will the _foo_ setter be redefined.

```javascript
var anotherObject = {
	a: 2
};

var myObject = Object.create( anotherObject );

anotherObject.a; // 2
myObject.a; // 2

anotherObject.hasOwnProperty( "a" ); // true
myObject.hasOwnProperty( "a" ); // false

myObject.a++; // oops, implicit shadowing!

anotherObject.a; // 2
myObject.a; // 3
```

> In JavaScript, there are no abstract patterns/blueprints for objects called "classes" as there are in class-oriented languages. JavaScript just has objects. All functions by default get a public, non-enumerable property on them called **prototype**, which points at an otherwise arbitrary object.

```javascript
function test () {
  return ''
}
console.log(test.prototype)
// Output:
  // {constructor: ƒ}
  // constructor: ƒ test()
  // length: 0
  // name: "test"
  // prototype:
  // constructor: ƒ test()
  // [[Prototype]]: Object
  // arguments: (...)
  // caller: (...)
  // [[FunctionLocation]]: test.html:14
  // [[Prototype]]: ƒ ()
  // [[Scopes]]: Scopes[2]
  // [[Prototype]]: Object
```

"Inheritance" implies a copy operation, and JavaScript doesn't copy object properties (natively, by default). Instead, JS creates a link between two objects, where one object can essentially delegate property/function access to another object. "Delegation" is a much more accurate term for JavaScript's object-linking mechanism.

> In JavaScript, it's most appropriate to say that a "constructor" is any function called with the new keyword in front of it. Functions aren't constructors, but function calls are "constructor calls" if and only if **new** is used.

```javascript
function test(name) {
  this.name = name;
}

test.prototype.name = function() {
  return this.name;
}

var test1 = new test("Vpn");
console.log(test1);
console.log(test1.name);
// Output:
// test {name: 'Vpn'}
// test.html:23 Vpn


// pre-ES6
// throws away default existing `Bar.prototype`
Bar.prototype = Object.create( Foo.prototype );

// ES6+
// modifies existing `Bar.prototype`
Object.setPrototypeOf( Bar.prototype, Foo.prototype );
```

Inspecting an instance (just an object in JS) for its inheritance ancestry (delegation linkage in JS) is often called _introspection_ (or _reflection_) in traditional class-oriented environments.

1.

```javascript
a instanceof Foo; // true
```

The question **instanceof** answers is: in the entire **[[Prototype]]** chain of _a_, does the object arbitrarily pointed to by _Foo.prototype_ ever appear?
If you have two arbitrary objects, say _a_ and _b_, and want to find out if the objects are related to each other through a **[[Prototype]]** chain, **instanceof** alone can't help.

2. The second, and much cleaner, approach to **[[Prototype]]** reflection is:

```javascript
Foo.prototype.isPrototypeOf( a ); // true
```

3. 

```javascript
a.__proto__ === Foo.prototype; // true

//  it is smth like:
Object.defineProperty( Object.prototype, "__proto__", {
	get: function() {
		return Object.getPrototypeOf( this );
	},
	set: function(o) {
		// setPrototypeOf(..) as of ES6
		Object.setPrototypeOf( this, o );
		return o;
	}
} );
```

.__ **proto** __ looks like a property, but it's actually more appropriate to think of it as a getter/setter. 

> It's best to treat object **[[Prototype]]** linkage as a read-only characteristic for ease of reading your code later.

For a variety of reasons, not the least of which is terminology precedent, "inheritance" (and "prototypal inheritance") and all the other OO terms just do not make sense when considering how JavaScript actually works (not just applied to our forced mental models).
Instead, "delegation" is a more appropriate term, because these relationships are not copies but delegation links.

## 32. Event loop

JavaScript has a runtime model based on an event loop, which is responsible for executing the code, collecting and processing events, and executing queued sub-tasks. This model is quite different from models in other languages like C and Java.

### Runtime concepts

#### Stack

Function calls form a stack of frames.

_|
_|
_|
_|

#### Heap

Objects are allocated in a heap which is just a name to denote a large (mostly unstructured) region of memory.

-_ -   _- - -- - _

#### Queue

A JavaScript runtime uses a message queue, which is a list of messages to be processed. Each message has an associated function that gets called to handle the message.

At some point during the event loop, the runtime starts handling the messages on the queue, starting with the oldest one. To do so, the message is removed from the queue and its corresponding function is called with the message as an input parameter. As always, calling a function creates a new stack frame for that function's use.

The processing of functions continues until the stack is once again empty. Then, the event loop will process the next message in the queue (if there is one).

Each message is processed completely before any other message is processed. This offers some nice properties when reasoning about your program, including the fact that whenever a function runs, it cannot be preempted and will run entirely before any other code runs (and can modify data the function manipulates). This differs from C, for instance, where if a function runs in a thread, it may be stopped at any point by the runtime system to run some other code in another thread.

A downside of this model is that if a message takes too long to complete, the web application is unable to process user interactions like click or scroll. The browser mitigates this with the "a script is taking too long to run" dialog. A good practice to follow is to make message processing short and if possible cut down one message into several messages.

In web browsers, messages are added anytime an event occurs and there is an event listener attached to it. If there is no listener, the event is lost. So a click on an element with a click event handler will add a message — likewise with any other event.

The function **setTimeout** is called with 2 arguments: a message to add to the queue, and a time value (optional; defaults to 0). The time value represents the (minimum) delay after which the message will be pushed into the queue. If there is no other message in the queue, and the stack is empty, the message is processed right after the delay. However, if there are messages, the setTimeout message will have to wait for other messages to be processed. For this reason, the second argument indicates a minimum time — not a guaranteed time.

>The execution depends on the number of waiting tasks in the queue.

Note!
A web worker or a cross-origin iframe has its own **stack**, **heap**, and **message queue**. Two distinct runtimes can only communicate through sending messages via the **postMessage** method. This method adds a message to the other runtime if the latter listens to **message** events.

A very interesting property of the event loop model is that JavaScript, unlike a lot of other languages, never blocks. Handling I/O is typically performed via events and callbacks, so when the application is waiting for an IndexedDB query to return or an XHR request to return, it can still process other things like user input.

## 33. How JavaScript Event Loop works when executing asynchronous code

### Javascript is synchronous and has a single thread of execution

That is, it is only capable of executing one task at a time which blocks the execution until it is finished and can proceed to the next one.

Therefore, although Javascript is not asynchronous, the inclusion of the WebAPI together with the Event Loop and the Queue Callback allow it to provide a certain aspect of asynchronicity so that the heavier tasks do not block the thread of execution.

```javascript
new Promise((res, rej) => {
  res(console.log('y'));
})
.then((v) => console.log("v"));

console.log("a");

const p = new Promise((res, rej) => {
  rej(console.log("d"));
});

setTimeout(() => {
  console.log("b");
}, 0);

new Promise((res, rej) => {
  res(console.log("c"));
});

p.then(() => console.log("e"));

p.catch(() => console.log("f"));

// y a d c v f b 
```
