# Object

```md file="../tip.md"
```

## 实例的创建和状态
实例的创建

```js
// 函数式
Object(any); // Object === Object.prototype.constructor
// 面向对象
new Object(any); // 返回any值对应的包装对象。使用 [new + 类型对象] 这样的面向对象范式
Object.create(null, propDescriptors) // 使用 [对象.属性] 这样的面向对象范式
// 字面量
const object = {}; // 最常用
// object.constructor === Object // true
```

实例的[内部属性](../overview/objectInternal.md)决定其状态
<!-- prettier-ignore -->
ecma|  外部方法 | 内部属性 | 属性描述符 | 表现说明
:---| :--- | :--- | :---: | :--:
-| -  | `[[Extensible]]为true` |-| 可以扩展新属性
5| `Object.preventExtensions(instance💥)` | `[[Extensible]]为false` |-| 不能扩展新属性
5| `Object.seal(instance💥)` | `[[Extensible]]为false`,<br>`[[sealed]]为true` | 全部属性描述符改为`configurable:false` | 不能扩展新属性、不能删除属性、不能重新定义属性<br>总结，若可写仍然可写，其他都不行
5| `Object.freeze(instance💥)` | `[[Extensible]]为false`,<br>`[[frozen]]为true` | 全部属性描述符改为`configurable:false`<br>`writable:false` | 不能扩展新属性，实例及其属性只读

::: details test
```js file="../../../demo/js/std/Object/static/freeze.test.js"
```
:::


## 属性和属性描述符
实例属性的特性由[属性描述符(集)](../overview/data-structure)控制

<!-- prettier-ignore -->
| 属性描述符 | 键可删除/重新定义 | 值可修改 | 键值可被检索 |
| :--- | :--- | :--- | :--- | 
| `configurable` | ✅ |  |  
| `writable` |  | ✅ |
| `enumerable` | |  | ✅

::: details test
```js file="../../../demo/js/std/datatype/descriptor.test.js"
```
:::

参数含[属性描述符](../overview/data-structure.md)（数据结构）的方法

<!-- prettier-ignore -->
ecma| api | describe |
--- | :--- | :--- | 
5|🗝️🔑 Object.create(`proto`[,`propDescriptors`]) | 创建实例，参数为原型对象和属性描述符集|
5|🗝️🔑 Object.defineProperty(`instance`💥,`propName`,`propDescriptor`) |(重新)定义属性|
5|🗝️🔑 Object.defineProperties(`instance`💥,`propDescriptors`)|(重新)定义属性集|
5|🗝️🔑 Object.getOwnPropertyDescriptor(`instance`,`propName`) |查询自身的属性描述符|
2017|🗝️🔑 Object.getOwnPropertyDescriptors(`instance`) |查询自身的属性描述符集|
1|🗝️🔑 Object.prototype.propertyIsEnumerable(`propName`) | 自身可枚举属性|

## 原型链相关

原型对象及原型链条相关方法
<!-- prettier-ignore -->
ecma| api | describe |
--- | :--- | :--- | 
2015|⛓️ Object.getPrototypeOf(`instance`) | 获取实例的原型对象
2015|⛓️ Object.setPrototypeOf(`instance`💥,`proto`) | 设置原型对象，会破坏 JS 引擎的优化（例如 V8）导致性能不佳。<br>推荐 `create` 来创建新对象
2015|⛓️ Object.prototype.isPrototypeOf(`instance`,`proto`) | 判断原型对象。相当于`proto === Object.prototype.getPrototypeOf(instance)`

## 方法-工具

数据结构转换
<!-- prettier-ignore -->
ecma| api |describe |
--- | --- | --- |
2017|🗝️ Object.entries(`instance`)<br>  | Object转为Entries
2017|🗝️🔑 Object.fromEntries(`instance`) | Entries转为Object
2024|Object.groupBy(`items`,`callback`) | 进行分组

属性操作
<!-- prettier-ignore -->
ecma| api | describe |
--- | :--- | :--- | 
2015|🔑 Object.getOwnPropertySymbols(`instance`)| 获取自身symbol类型的键名数组<br>不可枚举属性也会返回
5|🗝️ Object.getOwnPropertyNames(`instance`)| 获取自身 String类型的键名数组<br>不可枚举属性也返回
2015|🗝️🔑 Object.hasOwn(`instance`,`propName`) | 判断自身属性中有无该属性键名
3|~~Object.prototype.hasOwnProperty(`instance`,propName)~~|已废除，推荐`Object.hasOwn`
2015|🗝️🔑 Object.assign(`instance`💥, `...sources`) | 分配属性给实例。<br>sources列表自右向左逐个读取，然后覆盖实例上原有的属性。<br>source的属性是自有的、可枚举的,也可以是 null或undefined
2017|🗝️ Object.keys(`instance`)| 返回键名数组
2017|🗝️ Object.values(`instance`) | 返回键值数组

### 其他
<!-- prettier-ignore -->
ecma| api |describe |
--- | --- | --- |
2015|Object.is(`value1`,`value2`) | “同值相等”（SameValue）判断<br>见[SameValue](../overview/sameValue.md)
1|Object.prototype.toLocaleString() | 对象的本地化字符串表示<br>参考[国际化](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
1|Object.prototype.toString() | 对象的字符串表示。内部属性值[[Class]]用于描述一个值的类型`[object 类型]`。<br>用法:`Object.prototype.toString.call(any).slice(8,-1) // type`
1|Object.prototype.valueOf() | 取基本类型值