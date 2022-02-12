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