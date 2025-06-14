# 语法部分

## 目录

- [声明](./declaration)
- [表达式](./expression)
- [语句](./statement)
- [模块](./module)
- [严格模式](./strict)

## 语言标识符

### 分类

- 语法关键字：表示语法、符号等抽象概念
- 变量/常量：表示数据的存储位置

### 绑定

- 语法关键字和语义逻辑的绑定：即作用域的限制
- 变量与存储数据，变量与位置性质的绑定：即栈和堆的限定，变量生存周期的限定

### 语义

标识符所绑定的语义

- 声明：约定标识符的生命周期、逻辑的作用域
- 编程：描述数据和逻辑的过程
  - 描述数据的过程：变量和类型的声明
  - 描述逻辑的过程：语句（含流传控制子句）
  - 描述数据与(算法的)逻辑的过程：表达式

标识符的分类

<!--prettier-ignore-->
| 语义\标识符       | 标识符分类   | 标识符      | 示例            |
| --------------- | ------------ | ------------- | ------------- |
| 数据相关          | 类型         | -       | 无显示类型声明                        |
| 数据相关          | 变量         | 值、对象、Symbol、字面量     | null、undefined、new Object()         |
| 数据相关、逻辑相关 | 表达式       | 值运算、对象存取             | 'abc' && obj.name                     |
| 数据相关、逻辑相关 | 逻辑语句     | 顺序、分支、循环             | let x=''; if(x){}; for(...of...)      |
| 逻辑相关          | 流程控制语句 | 标签、异常、一般流程控制子句 | break;continue;return;try(){}catch{}; |
| 其他             | 其他         | 注释、模块                   |                                       |

## 绑定操作的语义

TODO

## 语法错误和运行时错误

静态错误和动态错误

TODO
