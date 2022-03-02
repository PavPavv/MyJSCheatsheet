# Interview questions (basics)

##  1. Data types
Primitives:
1.  Boolean
2.  Number
3.  String
4.  undefined
5.  null
6.  Symbol
7.  BigInt

Reference type:
1.  Object
2.  Function type for functions because of the legacy

## 2. Faulsy values
1.  false
2.  0
3.  -0
4.  ''
5.  undefined
6.  null
7.  NaN

## 3. Difference between undefined and null
In JavaScript, **undefined** means a variable has been declared but has not yet been assigned a value. **null** is an assignment value. It can be assigned to a variable as a representation of no value.

## 4. Logical operator && (AND)
In classical programming, AND returns true if both operands are truthy and false otherwise. AND “&&” finds the first falsy value and returns the last true value before first falsy value.
```javascript
true && console.log("Seen");
```

## 5. Logical operators priority

1.  !
2.  &&
3.  ||

## 6. Type Conversions

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

## 7. setTimeout() with zero delay

```javascript
setTimeout(() => {
  console.log("Print something else");
}, 0);
console.log("Print something");
```

## 8. Difference between spread and rest operators
When we see **...** in the code, it is either rest parameters or the spread syntax. There’s an easy way to distinguish between them:
- When **...** is at the end of function parameters, it’s “rest parameters” and gathers the rest of the list of arguments into an array.
- When **...** occurs in a function call or alike, it’s called a “spread syntax” and expands an array into a list.

Use patterns:
- Rest parameters are used to create functions that accept any number of arguments.
- The spread syntax is used to pass an array to functions that normally require a list of many arguments.

## 9. What is wrapper objects?
When you interact with a primitive value like it was an object (by calling a method or reading a property from it), JavaScript creates a wrapper object on the fly. You have read access to properties and methods of wrapper objects, like they were regular objects. A wrapper object is disposed right after a single use.

## 10. How to define if a certain property exists on some object? 

1. **in** operator
```javascript
const o = {
  prop: "bwahahah",
  prop2: "hweasa",
};
console.log("prop" in o); // true
console.log("prop1" in o); // false
```

2. **hasOwnProperty** method

```javascript
console.log(o.hasOwnProperty("prop2")); // true
console.log(o.hasOwnProperty("prop1")); // false
```

3. array index notation:

```javascript
console.log(o["prop"]); // bwahahah
console.log(o["prop1"]); // undefined
```

**\*in** operator checks if property exist even in prototypes, but **hasOwnProperty** — only in a given object.

## 11. How to create an object in JS?

1. Type constructor (deprecated):

```javascript
const obj = new Object();
obj.name = "Albert";
obj.greeting = function () {
  return `Hi, I'm ${this.name}!`;
};

console.log(obj); // {name: "Albert", greeting: [Function]}
console.log(obj.greeting()); //  'Hi, I'm Albert!
```

2. Object literal (a literal is a notation for representing a fixed value in source code):

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

3. Object.create method:

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
```

4. Constructor function:

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

5. Class syntax:

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

## 12. How to copy an object in JS?

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

but then both objects connected with each other by a single link and that means if one objects is changed then another wil be changed too.

2. Spread-operator:

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

3. Методы **JSON.parse(JSON.stringify(obj))**:

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

## 13. How to merge objects in JS?

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

but then both objects connected with each other by a single link and that means if one objects is changed then another wil be changed too.

2. Spread-оператор:

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

3. For a deep copy you need a custom recursive solution:

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
const user = merge(profile, job);

console.log(user);

// {
//     name: 'John Doe',
//     age: 25,
//     address: { city: 'Berlin', country: 'DE' },
//     profession: 'IT Engineer',
//     skills: ['JavaScript', 'React', 'Node']
// }
```

## 13. What is DOM?

**Document Object Model**, or **DOM** for short, represents all page content as objects that can be modified. The document object is the main “entry point” to the page. We can change or create anything on the page using it. 

According to the Document Object Model (DOM), every HTML tag is an object. Nested tags are “children” of the enclosing one. The text inside a tag is an object as well. All these objects are accessible using JavaScript, and we can use them to modify the page.

## 14. What the difference between event.target and event.currentTarget?

**event.currentTarget** (equals **this** in this case) is the element to which the event handler has been attached, as opposed to **event.target**, which identifies the element on which the event occurred and which may be its descendant.

## 15. What the difference between == and === ?
- The loose equality operator **==** allows us to compare two or more operands by converting their value to a common type first and then checking for the equality between them.

- Strict equality operator **===** allows us to compare two or more operands by checking the equality between the values as well as their types.

## 16. What is event "bubbling" ?
When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors. The most deeply nested element that caused the event is called a target element, accessible as event.target. 
A bubbling event goes from the target element straight up. Normally it goes upwards till **html**-tag, and then to document object, and some events even reach window, calling all handlers on the path. But any handler may decide that the event has been fully processed and stop the bubbling.
The method for it is **event.stopPropagation()**.

## 16. What is "capturing" phase of event?
The standard DOM Events describes 3 phases of event propagation:

1. Capturing phase – the event goes down to the element.
2. Target phase – the event reached the target element.
3.  Bubbling phase – the event bubbles up from the element.

To catch an event on the capturing phase, we need to set the handler capture option to true:

```javascript
elem.addEventListener(..., {capture: true})
// or, just "true" is an alias to {capture: true}
elem.addEventListener(..., true)
```
There are two possible values of the capture option:
- If it’s **false** (default), then the handler is set on the bubbling phase.
- If it’s **true**, then the handler is set on the capturing phase.

## 17. Ways to handle event is JS.

There are three ways of event handling:

- HTML attribute: _onclick="..."_.
- DOM-property: _elem.onclick = function_.
- Special methods: _elem.**addEventListener**(event, handler[, phase])_ - to add handler, **removeEventListener** - to remove handler.

No matter how you handle your event, every time it gets as a first argument event **event** object with such properties as **value**, **target**, **currentTarget** etc.

## 18. What is hoisting?

Hoisting is a behavior in JavaScript where variable and function declarations are “hoisted” to the top of their scope before code execution.
```javascript
var myVariable;
console.log(myVariable); // undefine
```

```javascript
var myVariable = 10;
console.log(myVariable); // 10
```
In order to run our code, the JavaScript interpreter takes two passes through the code. On the first pass it looks for variable and function declarations which it then “hoists” to the top of the scope; only then, on the second pass, does it make assignments and execute the code. 
Functions declarations are also “hoisted” to the top of the scope, which means you can call functions before they are declared in your code.
```javascript
hoistMe();

function hoistMe() {
  console.log("I'm a hoisted function.");
}
```
A variable assignment will always take precedence over a function declaration. The internal JavaScript interpreter will always give precedence to a function declaration.

==var assignment -> func declaration -> var declaration==

## 19. Variables and scoping (var, let, const)
A “variable” is just a property of the special internal object, **Environment Record**. “To get or change a variable” means “to get or change a property of that object”.

**let** works similarly to var, but the variable it declares is block-scoped, it only exists within the current block. var is function-scoped. Variables created by let are mutable.

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
**const** works like let, but the variable you declare must be immediately initialized, with a value that can’t be changed afterward. Constants, variables created by const, are immutable – you can’t assign different values to them.
```javascript
const foo = 'abc';
foo = 'def'; // TypeError
```
**const** only means that a variable always has the same value, but it does not mean that the value itself is or becomes immutable. For example, obj is a constant, but the value it points to is mutable – we can add a property to it.
If you want the value of obj to be immutable, you have to take care of it, yourself. For example, by freezing it:
```javascript
const obj = Object.freeze({});
obj.prop = 123; // TypeError
```
**Object.freeze()** is shallow, it only freezes the properties of its argument, not the objects stored in its properties. 

A variable declared by **let** or **const** has a so-called temporal dead zone (TDZ): When entering its scope, it can’t be accessed (got or set) until execution reaches the declaration.

**var**:
1. When the scope (its surrounding function) of a var variable is entered, storage space (a binding) is created for it. The variable is immediately initialized, by setting it to undefined.
2. When the execution within the scope reaches the declaration, the variable is set to the value specified by the initializer (an assignment) – if there is one. If there isn’t, the value of the variable remains undefined.

1. When the scope (its surrounding block) of a let variable is entered, storage space (a binding) is created for it. The variable remains uninitialized.
2. Getting or setting an uninitialized variable causes a ReferenceError.
3. When the execution within the scope reaches the declaration, the variable is set to the value specified by the initializer (an assignment) – if there is one. If there isn’t then the value of the variable is set to undefined.

**var**-declaring a variable in the head of a for loop creates a single binding (storage space) for that variable. Every i in the bodies of the three arrow functions refers to the same binding, which is why they all return the same value:
```javascript
const arr = [];
for (var i=0; i < 3; i++) {
    arr.push(() => i);
}
arr.map(x => x()); // [3,3,3]
```

If you let-declare a variable, a new binding is created for each loop iteration:
```javascript 
const arr = [];
for (let i=0; i < 3; i++) {
    arr.push(() => i);
}
arr.map(x => x()); // [0,1,2
```

**const** works like var, but you can’t change the initial value of a const-declared variable:
```javascript
// TypeError: Assignment to constant variable
// (due to i++)
for (const i=0; i<3; i++) {
    console.log(i);
}
```

## 20. Closure
In JavaScript, every running function, code block {...}, and the script as a whole have an internal (hidden) associated object known as the Lexical Environment.

The Lexical Environment object consists of two parts:
1. Environment Record – an object that stores all local variables as its properties (and some other information like the value of this).
2. A reference to the outer lexical environment, the one associated with the outer code.

Rectangles on the right-hand side demonstrate how the global Lexical Environment changes during the execution:

1. When the script starts, the Lexical Environment is pre-populated with all declared variables.
 -  Initially, they are in the “Uninitialized” state. That’s a special internal state, it means that the engine knows about the variable, but it cannot be referenced until it has been declared with let. It’s almost the same as if the variable didn’t exist.

2. Then let phrase definition appears. There’s no assignment yet, so its value is undefined. We can use the variable from this point forward.

3. phrase is assigned a value.
4. phrase changes the value.

> “Lexical Environment” is a specification object: it only exists “theoretically” in the language specification to describe how things work. We can’t get this object in our code and manipulate it directly.

A function is also a value, like a variable. The difference is that a Function Declaration is instantly fully initialized. During the function call we have two Lexical Environments: the inner one (for the function call) and the outer one (global).
When the code wants to access a variable – the inner Lexical Environment is searched first, then the outer one, then the more outer one and so on until the global one.
All functions have the hidden property named **[[Environment]]**, that keeps the reference to the Lexical Environment where the function was created.

A closure is a function that remembers its outer variables and can access them. In some languages, that’s not possible, or a function should be written in a special way to make it happen. But as explained above, in JavaScript, all functions are naturally closures (there is only one exception, to be covered in The "new Function" syntax).


## 22. Garbage collector
In JavaScript object only kept in memory while it’s reachable.
A Lexical Environment object dies when it becomes unreachable (just like any other object). In other words, it exists only while there’s at least one nested function referencing it.


## 21. useStrict

- If a variable is not found anywhere, that’s an error in strict mode (without use strict, an assignment to a non-existing variable creates a new global variable, for compatibility with old code).
- **this** default value is **undefined**
- you can not create new instace of the class without **new**-keyword
- you can not create functions with **eval()**
- you cannot duplicate parameters
- you can not delete "non-removable" object property

## 22. This
To access the object, a method can use the **this** keyword. The value of **this** is the object “before dot”, the one used to call the method.
In JavaScript, keyword **this** behaves unlike most other programming languages. It can be used in any function, even if it’s not a method of an object.

In JavaScript **this** is “free”, its value is evaluated at call-time and does not depend on where the method was declared, but rather on what object is “before the dot”. The value of this is defined at run-time.

Arrow functions are special: they don’t have their “own” **this**. If we reference **this** from such a function, it’s taken from the outer “normal” function.
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

## 23. Breaking loops in JS
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
In the code above, **break** outer looks upwards for the **label** named outer and breaks out of that loop. So the control goes straight from (*) to _alert('Done!')_. The **continue** directive can also be used with a **label**. In this case, code execution jumps to the next iteration of the labeled loop.