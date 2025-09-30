# 类型

特点
- “弱类型”。js 的类型无需靠“声明出来”，在运行时可进行数据实体的类型感知和转化。比如`typeof`、`Array.isArray`、`Object.prototype.toString`等
- “动态类型”。js的类型是动态的，在运行时可以对数据实体的结构进行增删改。

优缺点
|项目|描述|
|---|---|
|优点|开发效率极快、心智负担极低
|缺点|不可靠，仅适合快速构建项目原型。


如何在“无类型声明”的语言中构建可靠系统？防御式编程
| 层级 | 工具/方法 | 作用 |
|------|-----------|------|
| 运行时安全 | `typeof`、`Array.isArray`、`Object.prototype.toString` | 基本类型检测 |
| 模式守护 | `Type Guard` 函数、`instanceof`、`Symbol.for('type')` | 防止类型伪装 |
| 静态预检 | TypeScript | 编译期拦截错误，提前发现逻辑漏洞 |


示例：运行时类型守卫
```js
const type = {
  isNumber: (val) => typeof val === 'number',
  isString: (val) => typeof val === 'string',
  isArray: (val) => Array.isArray(val),
  isObject: (val) => val !== null && typeof val === 'object',
  isFunction: (val) => typeof val === 'function',
};

function input(data) {
    if (type.isNumber(data)) // TODO
    else if (type.isString(data)) // TODO
    else if (type.isArray(data)) // TODO
    else throw new Error('Unsupported type');
}

console.log(input(5));
```

## 数据类型

### Simple

有 7 种**原始数据类型**（又叫简单数据类型、基本数据类型、值类型）

| 基本数据类型 | 含义   | 说明                                                           |
| ------------ | ------ | -------------------------------------------------------------- |
| Undefined    | 未定义 | 未声明的变量或声明过但未赋值的变量，当然也可以赋值为 undefined |
| Null         | 空值   | 表示空对象指针                                                 |
| Boolean      | 布尔   | true/false                                                     |
| Number       | 数值   | IEEE 754 双精度浮点数使用 64 位来表示:符号,指数,尾数           |
| String       | 字符串 | 可以访问指定位置的字符，但不能修改                             |
| Symbol       | 符号   | 唯一值                                                         |
| Bigint       | 大整数 | 任意精度整数                                                   |

### Complex
除此以外都是**复杂数据类型**（Object 类型及其派生类型）。

运算过程中自动进行类型的转换，内部称为抽象操作
- ToPrimitive()转简单类型
- ToObject()转复杂类型

## 类库 

Javascript 的类型对象无需引入，已经挂载在了全局对象上了。

类库又称为：
- JavaScript standard library 标准库
- Standard Built-In Objects 标准内置对象
- Runtime library 运行时库,相对编译时库而言
