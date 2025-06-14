# 声明

声明的作用

- 定义标识符
- 定义类型（对比其他语言，没有明确的类型声明过程。比如没有 type 或 define 这类关键字）
- 定义初值

## 基本数据类型

7 种基本数据类型（简单数据类型、值类型）

| 基本数据类型 | 含义   | 说明                                                           |
| ------------ | ------ | -------------------------------------------------------------- |
| Undefined    | 未定义 | 未声明的变量或声明过但未赋值的变量，当然也可以赋值为 undefined |
| Null         | 空值   | 表示空对象指针                                                 |
| Boolean      | 布尔   | true/false                                                     |
| Number       | 数值   | IEEE 754 双精度浮点数使用 64 位来表示:符号,指数,尾数           |
| String       | 字符串 | 可以访问指定位置的字符，但不能修改                             |
| Symbol       | 符号   | 唯一值                                                         |
| Bigint       | 大整数 | 任意精度整数                                                   |

除此以外都是复杂数据类型（Object 类型及其派生类型）。

运算过程中自动进行类型的转换，内部称为抽象操作(ToPrimitive()转简单类型、ToObject()转复杂类型)

## 变量声明

- 显式声明：使用 let/const/var(不推荐) 关键字进行的声明
- 隐式声明：未声明而直接赋值 （应避免）

var 和 let 的不同点：

- 作用域不同：var 声明的变量作用域取决于函数作用域（动态作用域）；let 声明的变量作用域取决于代码块（静态作用域）。
- 多次声明：语法分析时允许 var 在其作用域中多次声明，而不允许 let 这样做
- 使用方式：var 声明的变量可以先使用（undefined）再声明，而 let 必须遵循先声明后使用。

const 与 let 的不同点：前者的值无法被修改。

赋值模板和解构赋值（在表达式左侧），可以声明一批变量。

```javascript
const { newName: name, newAge: age, ...more } = person;
const [x, y, z] = [1, 2, 3];
```

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
| \0         | NULL(NUL)       | 0000               |0  | 字符 NUL      |
| \b         | backspace(BS)   | 0008               |8  | 退格          |
| \t         | horizontal tabulation(HT)  | 0009/9  |9 | 水平制表符     |
| \n         | EOL/NL/LF       | 000A/10            |10 | 换行符，向上卷纸一行        |
| \v          | vertical tabulation(VT)   | 000B    |11 | 垂直制表符                |
| \f          | FORM FEED (FF)            | 000C    |12 | 换页符                   |
| \r          | CARRIAGE RETURN (CR)      | 000D    |13        | 回车符,电传打印机的打印头回到行首    |
| \'          | APOSTROPHE                | 0027    |39        | 单引号                           |
| \"          | QUOTATION MARK            | 0022    |34        | 双引号                           |
| \\\\        | REVERSE SOLIDUS           | 005C    |92        | 反斜线符                          |
| \xnn        |                           |         || ASCII 字符编码                                    |
| \unnnn      |                           |         || unicode 字符编码的基本平面字符（≤ FFFF）             |
| \u\{nnnnn\} |                           |         || unicode 字符编码的基本平面字符和扩展平面字符（＞ FFFF） |

CRLF 组合常见于文本文件、http 协议中。

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
