# 语句

代码文本由语句构成的，语句是语法分析的核心

- 单行语句，以`;`分号来分隔。
- 复合语句，以`{}`大括号来分隔。
- 部分语句存在返回值

| 类型       | 子类型         | 语法示例                                                                 |
| ---------- | -------------- | ------------------------------------------------------------------------ |
| 声明语句   | 数据声明语句   | var \| let \| const AssignmentPattern = expression                       |
|            | 函数声明语句   | function name(){}<br>function\* name(){}<br>class name extends superName |
|            | 导入导出语句   | import ... <br> export ...                                               |
| 表达式语句 | 变量赋值语句   | variable = value;                                                        |
|            | 函数调用语句   | foo();                                                                   |
|            | 属性赋值语句   | object.property = value;                                                 |
|            | 方法调用语句   | object.method()                                                          |
| 分支语句   | 条件分支语句   | if...else                                                                |
|            | 多重分支语句   | switch...case...default                                                  |
| 循环语句   | for            | for(initialization;test;increament)                                      |
|            | for...in       | for(let variable in propertyChain)                                       |
|            | for...of       | for(let variable of iterator)                                            |
|            | while          | while(expression) statement                                              |
|            | do...while     | do statement while(expression)                                           |
| 控制结构   | 继续执行子句   | continue [label];                                                        |
|            | 中断执行子句   | break [label];                                                           |
|            | 函数返回子句   | return [label]                                                           |
|            | 异常触发语句   | throw expression;                                                        |
|            | 异常捕获与处理 | try...catch...finally                                                    |
| 其他       | 空语句         | ;                                                                        |
|            | 块/复合语句    | {} <br> {...}                                                            |
|            | with 语句      | with(object) statement                                                   |
|            | 调试语句       | debugger;                                                                |
|            | 标签化语句     | labelname: statement                                                     |
