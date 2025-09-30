# Object

```md file="../tip.md"
```

## Instance
创建实例

```js
// 函数式
Object(any); // Object === Object.prototype.constructor
// 面向对象
new Object(any); // 返回any值对应的包装对象。使用 [new + 类型对象] 这样的面向对象范式
Object.create(null, propDescriptors) // 使用 [对象.属性] 这样的面向对象范式
// 字面量
const object = {}; // 最常用
// 实例的属性
object.constructor === Object // true
```
实例属性的状态，受[属性描述符(集)数据结构](../overview/data-structure)的控制

::: details test
```js file="../../../demo/js/std/datatype/descriptor.test.js"
```
:::

实例的状态，受以下三个方法控制

<!-- prettier-ignore -->
| state | **add prop** | delete prop | modify key | modify value | api |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `extensible` | ✔️ | ✔️ | ✔️ | ✔️ | Object.isExtensible(`instance`💥)
| `non-ext` | ❌ | ✔️ | ✔️ | ✔️ | Object.preventExtensions(`instance`💥) <br>Object.isExtensible(`instance`)// false
| `sealed` | ❌ | ❌ | ❌ | ✔️ | Object.seal(`instance`💥) <br>Object.isSealed(`instance`)// true
| `frozen` | ❌ | ❌ | ❌ | ❌ | Object.freeze(`instance`💥) <br>Object.isFrozen(`instance`)// true<br>Object.isSealed(`instance`)// true

实例状态的变化影响：
- 限制新属性的添加
- 改变存量属性的属性描述符
- 状态**从上往下**改变，不可逆！

::: details test
```js file="../../../demo/js/std/Object/static/freeze.test.js"
```
:::

## 方法-属性描述符

部分参数是[属性描述符](../overview/data-structure.md)数据结构

<!-- prettier-ignore -->
ecma| api | describe |
--- | :--- | :--- | 
5|Object.create(`proto`[,`propDescriptors`🗝️🔑]) | 创建实例，参数为原型对象和属性描述符集|
5|Object.defineProperty(`instance`💥,`propName`🗝️🔑,`propDescriptor`) |定义属性|
5|Object.defineProperties(`instance`💥,`propDescriptors`🗝️🔑)|定义属性集|
5|Object.getOwnPropertyDescriptor(`instance`) |查询自身的属性描述符|
5|Object.getOwnPropertyDescriptors(`instance`) |查询自身的属性描述符集|
1|Object.prototype.propertyIsEnumerable(`propName`🗝️🔑) | 自身可枚举属性|

## 方法-原型机制

原型对象链条相关
<!-- prettier-ignore -->
ecma| api | describe |
--- | :--- | :--- | 
2015|Object.setPrototypeOf(`instance`💥,`proto`) | 设置原型。因性能问题不推荐，推荐使用 `create` 来创建新对象
2015|Object.getPrototypeOf(`instance`) | 获取实例自己的原型对象
2015|Object.prototype.isPrototypeOf(`instance`,`proto`) | 判断原型<br>相当于`proto === Object.prototype.getPrototypeOf(instance)`

## 其他方法
属性相关
<!-- prettier-ignore -->
ecma| api | describe |
--- | :--- | :--- | 
2015|🔑 Object.getOwnPropertySymbols(`instance`)| 获取自身symbol类型的键名数组<br>不可枚举属性也会返回
5|🗝️ Object.getOwnPropertyNames(`instance`)| 获取自身 String类型的键名数组<br>不可枚举属性也返回
2015|Object.hasOwn(`instance`,`propName`🗝️🔑) | 判断自身属性中有无该属性键名
3|~~Object.prototype.hasOwnProperty(`instance`,propName)~~|判断自身属性中有没有该属性名<br>已废除，推荐`Object.hasOwn`
2015|Object.assign(`instance`💥, `...sources`🗝️🔑) | 分配属性给实例。<br>sources自右向左逐个读取。<br>source的属性是可枚举的自有的,可以是 null或undefined
2017|🗝️ Object.keys(`instance`)| 返回键名数组
2017|🗝️ Object.values(`instance`) | 返回键值数组

数据结构转换相关
<!-- prettier-ignore -->
ecma| api |describe |
--- | --- | --- |
2017|🗝️ Object.entries(`instance`)<br>  | 数据结构转换，object转为entries<br>不返回键是Symbol类型的
2017|🗝️🔑 Object.fromEntries(`instance`) | 数据类型转换，entries转为object
2024|Object.groupBy(`items`,`callback`) | 数组成员（对象）进行分组

未分类的工具
<!-- prettier-ignore -->
ecma| api |describe |
--- | --- | --- |
2015|Object.is(`value1`,`value2`) | “同值相等”（SameValue）判断<br>见[SameValue](../overview/sameValue.md)
1|Object.prototype.toLocaleString() | 对象的本地化字符串表示<br>参考[国际化](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
1|Object.prototype.toString() | 内部属性值[[Class]],用于描述一个值的类型，表示为`[object 类型]`。<br>用法:`Object.prototype.toString.call(any).slice(8,-1) // type`
1|Object.prototype.valueOf() | 取基本类型值