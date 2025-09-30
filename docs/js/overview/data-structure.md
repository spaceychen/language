# 常见的数据结构

## `propDescriptor` 属性描述符

用于描述对象实例的一个属性,又叫属性对象(Property Object)。

数据结构：

```jsonc
// 标准写法
{
  "value": <Any>, // 可读属性
  "writable": <Boolean,true>, // 可写属性
  "enumerable": <Boolean,true>, // 可枚举属性
  "configurable": <Boolean,true> // 可配置属性
}
// 函数写法
{
  get(){}, // 可读属性
  set(){}, // 可写属性
  "enumerable": <Boolean,true>, // 可枚举属性
  "configurable": <Boolean,true> // 可配置属性
}
```

默认值：

- 当对象以**字面量**和**构造器**定义时，所有属性的默认值为`true`
- 当对象以**属性描述符**定义时，该属性的默认值为`false`


Case: 属性描述符的默认值
```js
// TODO
```

属性状态说明

<!-- prettier-ignore -->
| 属性状态 |语义 |
| :--- | :--- |
| `configurable` 键可操作态 | 可被删除或重新定义
| `enumerable` 键可枚举态 | 可被检索 
| `writable` 值可操作态 | 可被写入


Case: 属性状态
```js
// TODO
```

## `propDescriptors` 属性描述符集

用于描述对象实例的所有属性,又叫属性集对象(Properties Object)。

数据结构：

```jsonc
{
  <String|Symbol>: <propDescriptor>, // key is propName
  ...
}
```

## `Entries` 条目

类似于字典的条目，常用于映射和查找。
可用场景：
- 配置
- 缓存
- 数据转换的中间态

数据结构：

```jsonc
[
  [<String|Symbol>, <Any>], // 键值对，第一个成员为key，第二个成员为value
  ...
]
```
