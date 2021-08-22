# Вопросы и ответы на собеседовании по JavaScript (уровень Middle)

## Назовите способы задать свойство объекту

1.

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

user.getFullName = function () {
  return `${this.firstName} ${this.surname}`;
};

console.log(user.firstName); // 'Paul'
user.n = "Pavel";
console.log(user.nameN); // 'Pavel'
console.log(user.getFullName()); // 'Pavel Durnov'
```

2.

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

**Object.defineProperty(obj, prop, descriptor\*)** позволяет объявить свойство объекта и тонко настроить его особые аспекты.
_descriptor_ - это объект, в котором задаются настройки свойства:

- **value** - значение св-ва, по умолчанию undefined
- **writeable** - true - значение св-ва можно менять, по умолчанию false
- **configurable** - true - можно удалять и менять в дальнейшем, по умолчанию false
- **enumarable** - true - можно просматривать в цикле **for...in** и методе **Object.keys()**. по умолчанию false
- **get** - функция, которая возвращает значения св-ва, по умолчанию undefined
- **set** - функция, которая записывает значения св-ва, по умолчанию undefined
  Если есть **get**/**set**, то **value** и **writeable** не нужно указывать!

## Назовите полезные методы для работы со свойствами объектами

**Object.keys(obj)**
**Object.getOwnPropertyNames(obj)** - возвращает массив со свойствами объектами
**Object.values(obj)**
**Object.entries(obj)**
**Object.fromEntries()** - превращает массив ключей и значений объекта в новый объект
**Object.defineProperty(obj, prop, descriptor)**
**Object.getOwnPropertyDescriptor(obj, prop)**
**Object.create(null)** - создание пустого объекта без прототипа
**Object.create(obj)** - создание объекта, где в качестве прототипа будет переданный аргументом объект

## Что выведет цикл и как исправить код на более ожидаемый последовательный вывод?

```javascript
for (var i = 0; i <= 5; i++) {
  setTimeout(function t() {
    console.log(i);
  }, i * 500);
}

// 6 6 6 6 6 6
```

Самое простое и действенное решение - это просто добавить **let**, так как **let**
имеет блочную область видимости и в циклах создает новую переменную на каждой итерации.

```javascript
for (let i = 0; i <= 5; i++) {
  setTimeout(function t() {
    console.log(i);
  }, i * 500);
}
// 0 1 2 3 4 5
```

Более заковырестое решение без **let** - это оставить **var** и сохранить сохранить
замыкание в модуле IFFE:

```javascript
for (var i = 0; i <= 5; i++) {
  (function () {
    var j = i; // замыкание, каждую итерацию будет создаваться новая переменная с новым значением
    // и выводиться в консоль
    setTimeout(function t() {
      console.log(j);
    }, j * 500);
  })();
}

// 0 1 2 3 4 5
```

## Пример нативного модуля (через замыкание)

```javascript
var MyModules = (function Manager() {
  var modules = {};

  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply(impl, deps);
  }

  function get(name) {
    return modules[name];
  }

  return {
    define,
    get,
  };
})();

function funcHello() {
  function hello(who) {
    return "Let me introduce: " + who;
  }

  return {
    hello,
  };
}

function funcBar(bar) {
  var hungry = "hippo";

  function awesome() {
    console.log(bar.hello(hungry).toUpperCase());
  }

  return {
    awesome,
  };
}

MyModules.define("bar", [], funcHello);
MyModules.define("foo", ["bar"], funcBar);

var bar = MyModules.get("bar");
var foo = MyModules.get("foo");

console.log(bar.hello("test"));
```

## Какая разница между лексической ОВ (JS) и динамической (Perl и Emacs Lisp, нет в JS, походий концепт у this)?

Лексическая область видимости определяется временем написания кода, тогда как динамическая область видимости (и this!) определяется во время выполнения. Лексическую область видимости интересует где функция была объявлена, а динамическую — откуда была вызвана функция.
Все ANGOL3-подобные языки (Pascal, C, C#, Java и др.) используют статические области видимости.
