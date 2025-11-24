# Object

```md file="../tip.md"
```

使用场景
| 场景 | 思路 |
|------|----------------|
| **封装与继承** | 理解js是基于原型链的，学习何时将特性封装到实例或分布到原型链上的各个节点|
| **性能优化** | 避免频繁修改 `[[Prototype]]`；<br>避免频繁查找：使用 `Object.create(null)` 创建无原型对象，减少继承链查找。 |
| **安全封装** | 对公共 API 使用 `Object.seal()` 甚至`Object.freeze()` 防止外部篡改。 |
| **自定义 JSON 序列化** | 给对象实现 `toJSON()`，或使用 `JSON.stringify(obj, replacer)` 通过 `replacer` 函数动态控制序列化过程。 
| **代理（Proxy）** | 通过 `handler.get`, `handler.set`, `handler.has` 等映射到内部方法，实现权限校验、懒加载等功能。 |
| **检测对象类型** | 用 `Object.prototype.toString.call(obj)` 或 `Reflect.ownKeys()` 判断内置对象或自定义类实例。 |

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

修改[对象内部属性](../overview/objectInternal.md)的方法
<!-- prettier-ignore -->
|  外部方法\内部属性 | [[Extensible]] | [[Configurable]] | [[Writable]]
| :--- | :--- | :--- | :--- 
| - <br>默认态 | `true` | `true` | `true `
| `Object.preventExtensions(instance💥)`<br>不可扩展态 | `false` | `true` | `true`
| `Object.seal(instance💥)`<br>封存态 | `false` | `false` | `true` 
| `Object.freeze(instance💥)`<br>冻结态 | `false` | `false` | `false `

::: details test
```js file="../../../demo/js/std/Object/static/freeze.test.js"
```
:::

实例的属性受[属性描述符(集)](../overview/data-structure)的控制

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

## 属性描述符

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

## 原型机制

原型对象及原型链条相关
<!-- prettier-ignore -->
ecma| api | describe |
--- | :--- | :--- | 
2015|⛓️ Object.getPrototypeOf(`instance`) | 获取实例的原型对象
2015|⛓️ Object.setPrototypeOf(`instance`💥,`proto`) | 设置原型对象，性能不佳。<br>推荐 `create` 来创建新对象
2015|⛓️ Object.prototype.isPrototypeOf(`instance`,`proto`) | 判断原型对象。相当于`proto === Object.prototype.getPrototypeOf(instance)`

## 方法-工具

### 数据结构转换
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
2015|🗝️🔑 Object.assign(`instance`💥, `...sources`) | 分配属性给实例。<br>sources自右向左逐个读取，然后覆盖实例上原有的属性。<br>source的属性是可枚举的自有的,可以是 null或undefined
2017|🗝️ Object.keys(`instance`)| 返回键名数组
2017|🗝️ Object.values(`instance`) | 返回键值数组

### 其他
// TODO
<!-- prettier-ignore -->
ecma| api |describe |
--- | --- | --- |
2015|Object.is(`value1`,`value2`) | “同值相等”（SameValue）判断<br>见[SameValue](../overview/sameValue.md)
1|Object.prototype.toLocaleString() | 对象的本地化字符串表示<br>参考[国际化](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)
1|Object.prototype.toString() | 内部属性值[[Class]],用于描述一个值的类型，表示为`[object 类型]`。<br>用法:`Object.prototype.toString.call(any).slice(8,-1) // type`
1|Object.prototype.valueOf() | 取基本类型值