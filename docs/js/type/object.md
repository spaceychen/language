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

实例的特性受内部属性的控制
- [[Extensible]] 新属性的可扩展性开关，false 就不能添加新属性了
- [[Configurable]] 存量属性的可配置性开关，同步修改所有存量属性的属性描述符`configurable`
- [[Writable]] 存量属性的可写入开关，同步修改存量属性的属性描述符`writable`
- [[Configurable]]和[[Writable]] 仅通过修改存量属性的属性描述符来施加影响力

修改内部属性的方法
<!-- prettier-ignore -->
|  方法 | [[Extensible]] | [[Configurable]] | [[Writable]] | 实例状态(抽象)
| :--- | :--- | :--- | :--- | :--- |
| - | `true` | `true` | `true `| `extensible`
| `Object.preventExtensions(instance💥)` | `false` | `true` | `true`| `non-ext`
| `Object.seal(instance💥)` | `false` | `false` | `true` |`sealed`
| `Object.freeze(instance💥)` | `false` | `false` | `false ` | `frozen`

::: details test
```js file="../../../demo/js/std/Object/static/freeze.test.js"
```
:::

实例属性的特性受[属性描述符(集)](../overview/data-structure)的控制

<!-- prettier-ignore -->
| 属性描述符 | 可删除/重新定义 | 可修改值 | 可被检索 |
| :--- | :--- | :--- | :--- | 
| `configurable` | ✔️ |  |  
| `writable` |  | ✔️ |
| `enumerable` | |  | ✔️

::: details test
```js file="../../../demo/js/std/datatype/descriptor.test.js"
```
:::

## 方法-属性描述符

部分参数是[属性描述符](../overview/data-structure.md)数据结构

<!-- prettier-ignore -->
ecma| api | describe |
--- | :--- | :--- | 
5|🗝️🔑 Object.create(`proto`[,`propDescriptors`]) | 创建实例，参数为原型对象和属性描述符集|
5|🗝️🔑 Object.defineProperty(`instance`💥,`propName`,`propDescriptor`) |定义属性|
5|🗝️🔑 Object.defineProperties(`instance`💥,`propDescriptors`)|定义属性集|
5|🗝️🔑 Object.getOwnPropertyDescriptor(`instance`,`propName`) |查询自身的属性描述符|
5|🗝️🔑 Object.getOwnPropertyDescriptors(`instance`) |查询自身的属性描述符集|
1|🗝️🔑 Object.prototype.propertyIsEnumerable(`propName`) | 自身可枚举属性|

## 方法-原型机制

原型对象及原型链条相关
<!-- prettier-ignore -->
ecma| api | describe |
--- | :--- | :--- | 
2015|⛓️ Object.getPrototypeOf(`instance`) | 获取实例的原型对象
2015|⛓️ Object.setPrototypeOf(`instance`💥,`proto`) | 设置原型对象，性能不佳。<br>推荐 `create` 来创建新对象
2015|⛓️ Object.prototype.isPrototypeOf(`instance`,`proto`) | 判断原型对象。相当于`proto === Object.prototype.getPrototypeOf(instance)`

## 方法-工具

数据结构转换
<!-- prettier-ignore -->
ecma| api |describe |
--- | --- | --- |
2017|🗝️ Object.entries(`instance`)<br>  | 数据结构转换，object转为entries<br>不返回键是Symbol类型的
2017|🗝️🔑 Object.fromEntries(`instance`) | 数据类型转换，entries转为object
2024|Object.groupBy(`items`,`callback`) | 数组成员（对象）进行分组

属性各种操作
<!-- prettier-ignore -->
ecma| api | describe |
--- | :--- | :--- | 
2015|🔑 Object.getOwnPropertySymbols(`instance`)| 获取自身symbol类型的键名数组<br>不可枚举属性也会返回
5|🗝️ Object.getOwnPropertyNames(`instance`)| 获取自身 String类型的键名数组<br>不可枚举属性也返回
2015|🗝️🔑 Object.hasOwn(`instance`,`propName`) | 判断自身属性中有无该属性键名
3|~~Object.prototype.hasOwnProperty(`instance`,propName)~~|判断自身属性中有没有该属性名<br>已废除，推荐`Object.hasOwn`
2015|🗝️🔑 Object.assign(`instance`💥, `...sources`) | 分配属性给实例。<br>sources自右向左逐个读取。<br>source的属性是可枚举的自有的,可以是 null或undefined
2017|🗝️ Object.keys(`instance`)| 返回键名数组
2017|🗝️ Object.values(`instance`) | 返回键值数组

未分类
<!-- prettier-ignore -->
ecma| api |describe |
--- | --- | --- |
2015|Object.is(`value1`,`value2`) | “同值相等”（SameValue）判断<br>见[SameValue](../overview/sameValue.md)
1|Object.prototype.toLocaleString() | 对象的本地化字符串表示<br>参考[国际化](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
1|Object.prototype.toString() | 内部属性值[[Class]],用于描述一个值的类型，表示为`[object 类型]`。<br>用法:`Object.prototype.toString.call(any).slice(8,-1) // type`
1|Object.prototype.valueOf() | 取基本类型值