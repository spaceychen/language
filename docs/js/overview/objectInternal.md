# Object 内部实现
## 内部属性（internal Slots）

| Slot | 作用 / 描述 | 与之对应的外部接口 |
|------|-------------|-------------------|
| `[[PrimitiveValue]]`（包装对象） | 包装原始值（如 `new Number(1)`）。 | `valueOf()` 触发 |
| `[[Class]]`（ES3/ES5） | 对象的内部类名，主要用于 `Object.prototype.toString.call(obj)` 的实现。 | `Object.prototype.toString.call(obj)` |
| `[[Constructor]]`（类实例） | 指向构造函数的引用。 | `obj.constructor` |
| `[[Prototype]]` | 指向对象原型链上的上一级对象。 | `obj.__proto__`, `Object.getPrototypeOf(obj)`, `Object.setPrototypeOf(obj, proto)` |
| `[[Stringifier]]` (可选) | 用于 `JSON.stringify()` 时自定义序列化逻辑。 | `obj.toJSON()` 触发机制 |
| `[[Extensible]]` | 是否允许在对象上添加新属性（即是否可扩展）。 | `Object.isExtensible(obj)`, `Object.preventExtensions(obj)` |
| `[[Sealed]]` | 对象是否被封存（即不可扩展，且所有属性都是不可配置的）。 | `Object.isSealed(obj)`, `Object.seal(obj)` |
| `[[Frozen]]` | 对象是否被冻结（既不可扩展也无法修改现有属性）。 | `Object.isFrozen(obj)`, `Object.freeze(obj)` |



## 内部方法（internal methods）

| Method | 触发时机 / 用途 | 与之对应的外部 API |
|--------|-----------------|--------------------|
| `[[GetOwnProperty]](P)` | 获取对象自身属性描述符。 | `Object.getOwnPropertyDescriptor(obj, P)`, `obj.hasOwnProperty(P)` |
| `[[Set]](P, V, Receiver)` | 设置属性值（会触发 setter、原型链查找）。 | 直接赋值 `obj[P] = V`，或者 `Reflect.set(obj, P, V)` |
| `[[Delete]](P)` | 删除属性。 | `delete obj[P]`, `Reflect.deleteProperty(obj, P)` |
| `[[PreventExtensions]]()` | 标记对象不可扩展。 | `Object.preventExtensions(obj)`, `Reflect.preventExtensions(obj)` |
| `[[IsExtensible]]()` | 判断是否可扩展。 | `Object.isExtensible(obj)`, `Reflect.isExtensible(obj)` |
| `[[OwnPropertyKeys]]()` | 获取所有自身属性键（包括 Symbol）。 | `Object.getOwnPropertyNames(obj)`, `Object.getOwnPropertySymbols(obj)`, `Reflect.ownKeys(obj)` |
| `[[HasInstance]](V)` | 判断对象是否为构造函数的实例。 | `obj instanceof Constructor` |
| `[[IsCallable]]()` | 判断对象是否可调用（即函数）。 | `typeof obj === 'function'` |
| `[[Construct]](args, newTarget)` | 用作构造器创建新实例。 | `new Constructor(...args)`, `Reflect.construct(Constructor, args, newTarget)` |