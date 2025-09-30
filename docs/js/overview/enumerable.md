# enumerable

在 JavaScript 中，对于属性标识符为不可枚举（non-enumerable）的属性，语义上常规的语法和方法确实无法直接查询到属性的，但存在例外情况。

不可枚举属性并非完全 “不可查询”，只是会被大多数常规遍历方法忽略。通过特殊方法，或直接访问已知属性名，仍然可以获取不可枚举属性。这一特性常用于定义对象的内部方法或隐藏属性（如原型链上的基础方法）。

## Object.getOwnPropertyNames()
可以返回对象自身的所有属性（包括不可枚举属性，但不包括 Symbol 属性），无论是否可枚举。
```js
const obj = { a: 1 };
Object.defineProperty(obj, 'b', {
  value: 2,
  enumerable: false // 不可枚举
});

console.log(Object.getOwnPropertyNames(obj)); // ['a', 'b']
```

## Object.getOwnPropertySymbols()
专门用于获取对象自身的所有 Symbol 属性，包括不可枚举的。
```js
const sym = Symbol('secret');
const obj = {};
Object.defineProperty(obj, sym, {
  value: 3,
  enumerable: false
});

console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(secret)]
```

## Reflect.ownKeys()
返回对象自身的所有属性键名，包括不可枚举属性和 Symbol 属性，相当于 Object.getOwnPropertyNames() + Object.getOwnPropertySymbols() 的组合。
```js
const sym = Symbol('secret');
const obj = { a: 1 };
Object.defineProperty(obj, 'b', { value: 2, enumerable: false });
Object.defineProperty(obj, sym, { value: 3, enumerable: false });

console.log(Reflect.ownKeys(obj)); // ['a', 'b', Symbol(secret)]
```

## 直接访问属性
无论属性是否可枚举，只要知道属性名，都可以直接通过 `.` 或 `[]` 访问。
```js
const obj = { a: 1 };
Object.defineProperty(obj, 'b', { value: 2, enumerable: false });

console.log(obj.b); // 2（直接访问成功）
```

## 查看对象原型链上的不可枚举属性
例如 Object.prototype.toString 是不可枚举的，但可以通过原型链访问到：
```js
console.log(Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable); // false
console.log({}.toString); // 可以访问到该方法
```


