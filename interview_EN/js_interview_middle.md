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
**true** if the value associated with the property may be changed with an assignment operator. Defaults to *false**.

#### Accessor descriptor
**get**
A function which serves as a getter for the property, or **undefined** if there is no getter. When the property is accessed, this function is called without arguments and with this set to the object through which the property is accessed (this may not be the object on which the property is defined due to inheritance). The return value will be used as the value of the property. Defaults to **undefined**.

**set**
A function which serves as a setter for the property, or undefined if there is no setter. When the property is assigned, this function is called with one argument (the value being assigned to the property) and with **this** set to the object through which the property is assigned. Defaults to **undefined**.

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