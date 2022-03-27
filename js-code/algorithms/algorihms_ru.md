# Алгоритмы

## Сложность алгоритмов
Сложность алгоритма - это то, как будет расти расход ресурсов с увеличением размера входных данных.
Под ресурсами понимается время и память.
**Big O** - это функция, которая описывает рост сложности алгоритма. По сути это
график функции алгоритма, который отражает зависимоть использования памяти и времени от колличества исполнения операций. Нотация Big O указывает на самую быстрорастущую сложность алгоритма и игнорирует константные оптимизации.

#### O(n) - линейная сложность алгоритма.
Линейная сложность алгоритма(чем больше массив, переданный в качестве аргумента, тем больше итераций по нему) :
```javascript
function linearCompexity(array) {
  let sum = 0;

  array.forEach(number => sum += number);

  return sum;
}
```
#### O(1) - постоянная сложность алгоритма.
В следующем примере алгоритм вообще ничего не принимает, поэтому никак не зависит от входных данных:
```javascript
function constantComplexity() {
  const a = 1 + 2;
  const b = 3 + 4;

  console.log('calculating...');

  return b - a;
}
```
#### O(n^2) - квадратичная сложность алгоритма.
```javascript
function squaredComplexity(array) {
  for (let i = 0; i < array.length; i++) {
  	for (let j = 0; j < array.length; j++) {
    	  array[i] = array[i] + array[j];
  	}
  }

  return array;
}
```

Пример оптимизации квадратичной сложности алгоритма:
```javascript
function squaredComplexity(array) {
  let total = 0;

  array.forEach(num => {
    const additional = array.indexOf(num) > 5 ? 5 : 1;
    // indexOf - реализован тоже с помощью цикла, получаем два вложенных цикла

    total = total + num + additional;
  });

  return array;
}

function becameLinearComplexity(array) {
  let total = 0;

  array.forEach((num, index) => {
    const additional = index > 5 ? 5 : 1;

    total = total + num + additional;
  });

  return array;
}
```

#### Виды сложностей алгоритма по увеличению потрбления памяти и времени, на примере входящего массива с 10 000 (десятью тысячами) элементов:
1. O(1) - **константная** — 1 (одна) операция;
2. O(log n) - **логарифмическая** (например, бинарный поиск) — ~13 (чуть более тринадцати) операций;
3. O(n log n) - **логарифмическая** (например, бинарный поиск) — ~13 (чуть более тринадцати) операций;
4. O(n) - **линейная** — 10 000 (десять тысяч) операций;
5. O(n*k)
6. O(n^2) - **квадратичная** — 100 000 000 (сто миллионов) операций;
7. O(n^3) - O(n^3), **кубическая** (если бы у нас был тройной вложенный цикл) — 1 000 000 000 000 (один триллион) операций;
8. O(2^n) - 2 в n-степени;
9. O(n!) - O(n!), **факториал от числа n** (поиск всех перестановок, пример — наивное решение очень популярной задачи коммивояжера) — 10 000 000 000 000 000 000 000 000...