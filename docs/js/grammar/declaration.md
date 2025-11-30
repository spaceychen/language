# 声明

- 定义标识符
- 定义类型（js没有明确的类型声明过程，没有 type 或 define 这类关键字）
- 定义初值


## 变量声明

- 显式声明：使用 let/const/var(不推荐) 关键字进行的声明
- 隐式声明：未声明而直接赋值 （应避免）



`var` 和 `let` 的不同点：后者更加符合直觉

- 作用域不同：var 声明的变量作用域取决于函数作用域（动态作用域）；let 声明的变量作用域取决于代码块位置（静态作用域）。
- 多次声明：语法分析器规定在相同作用域中，var 可以多次声明，但let不可以。
- 使用方式：var 声明的变量可以先使用（undefined）再声明，而 let 必须遵循先声明后使用。

举例：var 声明的变量可以先使用再声明,即变量被提升到未声明的位置去使用

```js
console.log(message); // undefined
var message = "Hello, World!";
```



`const` 与 `let` 的不同点：前者的值(变量绑定的值)无法被修改，而值引用的对象则可以修改。


赋值模版，可以构建动态的字符串。

解构赋值，可以声明一批变量。

```javascript
const { newName: name, newAge: age, ...more } = person;
const [x, y, z] = [1, 2, 3];
```

支持解构赋值的类型：
| 类型 | 是否支持解构 | 使用方式 |
|------|--------------|----------|
| **Object（对象）** | ✅ | 使用 `{}` 解构 |
| **Array（数组）** | ✅ | 使用 `[]` 解构 |
| **String（字符串）** | ✅ | 将字符串视为字符数组解构 |
| **Map（映射）** | ✅ | 使用 `Map` 的迭代器解构 |
| **Set（集合）** | ✅ | 使用 `Set` 的迭代器解构 |
| **函数参数（Function Parameters）** | ✅ | 使用解构作为函数参数 |
| **函数返回值（Function Return Values）** | ✅ | 使用解构获取函数返回的多个值 |
| **Generator（生成器）** | ✅ | 使用解构获取生成器的 yield 值 |
| **TypedArray（类型数组）** | ✅ | 可以解构为数字、布尔值等 |
| **Promise（Promise 对象）** | ❌ | 通过 `.then()` 链式调用来获取 Promise 的值 |
| **Symbol（符号）** | ❌ | 
| **Number、Boolean、String、BigInt、Undefined、Null、NaN、Function、RegExp 等原始类型** | ❌ | 

## 字面量声明

字面量也叫直接量，是指无须声明就可以使用的常量（形式上类似汇编语言的立即值）

7 种基本数据类型的字面量风格的声明:

| 类型      | 字面量声明                 | 对应的包装对象 | 说明 |
| --------- | -------------------------- | -------------- | ---- |
| undefined | const v = undefined;       | 无             |      |
| null      | const v = null;            | Object         |      |
| string    | 双引号、单引号、模版字符串 | String         |      |
| number    | const v = 1;               | Number         |      |
| boolean   | const v = true;            | Boolean        |      |
| symbol    | 无                         | 无             |      |
| bigint    | const v = 1n;              | BigInt         |      |

### 字符串字面量、转义符

ECMAScript 要求字符串必须是 Unicode 字符序列。

转义符"\\"用于表示控制字符和不能直接输入的字符（不然会被系统语言自动转义）

<!--prettier-ignore-->
| 转义符      | Unicode-name    | codepoint（16 进制） |十进制数| 含义          |
| ---------- | --------------- | ------------------   |---| ---------- |
| `\0 `        | NULL(NUL)       | 0000               |0  | 字符 NUL      |
| `\b`         | backspace(BS)   | 0008               |8  | 退格          |
| `\t`         | horizontal tabulation(HT)  | 0009/9  |9 | 水平制表符     |
| `\n`         | EOL/NL/LF       | 000A/10            |10 | 换行符，向上卷纸一行        |
| `\v`         | vertical tabulation(VT)   | 000B    |11 | 垂直制表符                |
| `\f`          | FORM FEED (FF)            | 000C    |12 | 换页符                   |
| `\r`          | CARRIAGE RETURN (CR)      | 000D    |13        | 回车符,电传打印机的打印头回到行首    |
| `\'`          | APOSTROPHE                | 0027    |39        | 单引号                           |
| `\"`          | QUOTATION MARK            | 0022    |34        | 双引号                           |
| `\\`        | REVERSE SOLIDUS           | 005C    |92        | 反斜线符                          |
| `\xnn`        |                           |         || ASCII 字符编码                                    |
| `\unnnn`      |                           |         || unicode 字符编码的基本平面字符（≤ FFFF）             |
| `\u\{nnnnn\}` |                           |         || unicode 字符编码的基本平面字符和扩展平面字符（＞ FFFF） |

`CRLF` 组合常见于文本文件、http 协议中。

常见的转义符
[ Controls and Basic Latin ](https://www.unicode.org/charts/PDF/U0000.pdf)

### 模板字面量

即动态的字符串，上下文变量需要先确定。

```javascript
// 1
const text = `my name is ${name}`; // 上下文的name变量必须已声明且已赋值
// 2
const text = (tpl) => String.raw(tpl, "Hi");
text`${1},world`;
// 3
String.raw(raw:['',"world!"],"Hi")
```

### 数值字面量

<!--prettier-ignore-->
| 进制        | 字面量解析      | 说明      | 
| ------------ | --------- | --------- |
| 二进制(Binary)     | [ob,0B]开头，位取值范围[0,1]     | 采用位运算符时，引擎将以整型来运算    |
| 八进制(Octal)      | [0o,0O]开头，位取值范围[0-7]     |                                  |
| 十六进制(Hexadecimal) | [0x,0X]开头，位取值范围[0-9,A-F] |                  |
| 十进制(Decimal)       | 位的取值范围[0-9,\.,e,E] | 除以上三种情况外走十进制解析。内部的存放格式可能是浮点数或整型数，这取决于引擎的实现，而不是字面量形式。 |

+/- 表示数值的正和负

## 其他声明

### 常量声明

常量声明和变量声明在本质上没有区别，都是将标识符和数据绑定起来。

```javascript
const NAME = "JOHN"; // 常量声明
let temp = 1; // 变量声明
```

### 符号声明

它是值而非对象(虽然是 首字母大写的 Symbol)，更没有字面量声明形式。

```javascript
const key = Symbol();
```

### 函数声明

- 具名函数
- 匿名函数
- 形式参数
  - 默认值：arg=default
  - 剩余参数：赋值模板语法
- function\* 表示生成器
- class 表示类，使用 new 来实例化
