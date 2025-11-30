# Array
```md file="../tip.md"
```

数组的特点

- 存储空间大小自动调整
- 元素类型不限。（使用类型化数组 TypedArray 来限制类型）
- 索引为正整数 [0, +Infinity）
- 所有全局对象的所有内置方法,对其都是浅拷贝

## Instance
创建实例

```js
// 推荐的实例化方式
const arr = [1, 2]; // 字面量，适合写静态数据
Array.of(1, 2); // [1,2]
Array.from("abc"); // ["a","b","c"]
// 构造函数传入多个参数
new Array(1, 2); // [1,2]，等同于new Array.prototype.constructor(1, 2)
Array(1, 2); // 同上，等同于 Array.prototype.constructor(1, 2)
// 构造函数传入单个参数
new Array(2); // [undefined,undefined], 单个参数表示长度
Array(2); // 同上，等同于Array.prototype.constructor(2)
// 实例的属性
arr.length; // 2
```

## Methods

以下方法默认来自 Array.prototype

增删改，均有副作用

<!-- prettier-ignore -->
| ecma| api | semantics | note|
|--- | --- | --- | ---|
5|💥push(...items) |向数组的末尾添加一个或更多元素，返回新的长度|
5|💥pop() |移除数组的最后一个元素，返回该元素|
5|💥shift() |移除数组的第一个元素，返回该元素|
5|💥unshift(...items) |向数组的开头添加一个或更多元素，返回新的长度|
5|💥splice(start,count,...itemN) |删除选择元素,在此位置可添加新元素|
2015|💥fill(item,[start,[end]]) |按索引范围填充(替换)数组成员|
2015|💥copyWithin(target, start, [end]) |数组内部复制和粘贴。|target 即替换指针，start/end 为参考范围指针
5|💥reverse() |反转数组中的元素顺序|
5|💥sort([cb]) |对数组元素进行排序|

<!-- ::: details exercises
::: code-group
<<< @/../codes/js/std/Array/add&delete.test.js [add&delete]
<<< @/../codes/js/std/Array/modify.test.js [modify]
::: -->

遍历

<!-- prettier-ignore -->
|ecma| api |describe |note |
|--- | --- | --- | --- |
5|forEach(cb,[thisArg])|遍历数组中的每个元素，通过执行回调|
5|map(cb,[thisArg])|遍历数组中的每个元素，返回一个新数组（每轮的返回值）|
5|every(cb,[thisArg])|测试数组中所有元素是否都通过由提供的函数实现的测试|
5|some(cb,[thisArg])|测试数组中是否至少有一个元素通过由提供的函数实现的测试|
5|filter(cb,[thisArg])|返回数组，成员通过了测试|
5|reduce(cb, [initialValue])|对数组中的每个元素执行 reduce 操作（从左到右），将其结果进行汇总|
5|reduceRight(cb, [initialValue])|对数组中的每个元素执行 reduce 操作（从右到左），将其结果进行汇总|

<!-- ::: details exercises
::: code-group
<<< @/../codes/js/std/Array/iterate.test.js [iterate]
::: -->

检索位置和元素

<!-- prettier-ignore -->
|ecma| api |describe |note |
|--- | --- | --- | --- |
2015|find(cb, [thisArg])|返回数组中满足提供的测试函数的第一个元素的值，否则返回 undefined|
2015|findIndex(cb, [thisArg])|返回数组中满足提供的测试函数的第一个元素的索引，否则返回-1|
2022|findLast(cb, [thisArg])|返回数组中满足提供的测试函数的最后一个元素的值，否则返回 undefined|
2022|findLastIndex(cb, [thisArg])|返回数组中满足提供的测试函数的最后一个元素的索引，否则返回-1|
2022|at(index)|返回数组中指定位置的元素|index 可以是负数|
5|indexOf(searchElement, [fromIndex])|返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1|
5|lastIndexOf(searchElement, [fromIndex])|返回在数组中可以找到一个给定元素的最后一个索引，如果不存在，则返回-1|
5|slice([start], [end])|返回一个新数组，包含从开始到结束（不包括结束）选择的数组的一部分|

<!-- ::: details exercises
::: code-group
<<< @/../codes/js/std/Array/query.test.js [query]
::: -->

其他工具

<!-- prettier-ignore -->
|ecma| api |describe |note |
|--- | --- | --- | --- |
2023|toSpliced(start,count,...itemN)|返回新数组，其中剔除了选择元素、添加了新元素|
2023|toSorted([cb])|返回排序后的数组，是 sort 方法的改进版|
2023|with(index,item)|返回新数组，选中元素将被新元素替代|
2016|includes(searchElement, [fromIndex])|判断数组是否包含某个元素|
5|join([separator])|将数组中的所有元素连接成一个字符串|
5|concat(...valueN)|返回合并成员后的数组|
2015|keys()|返回一个新的 Array Iterator 对象，包含数组中每个索引的键|
2015|values()|返回一个新的 Array Iterator 对象，包含数组中每个索引的值|
2015|entries()|返回一个新的 Array Iterator 对象，包含数组中每个索引的键值对|
2019|flat([depth]) |将数组扁平化到指定的深度|
2019|flatMap(cb, [thisArg])|对数组的每个元素执行一个由提供的函数定义的映射操作，然后将其结果合并为一个新数组，并且结果数组的元素会被扁平化到一个深度|
5|toLocaleString()|返回一个表示数组的字符串，使用当前的地区设置的语言|
5|toString()|返回一个表示数组及其元素的字符串|
2015|\[Symbol.iterator]()|返回一个新的 Array Iterator 对象，该对象包含数组中每个索引的值|
2015|Array.from(arrayLike, [cb], [thisArg])|参考可迭代对象，返回一个新的 Array 实例，在迭代中执行cb|
2015|Array.fromAsync(arrayLike, [cb], [thisArg])|参考异步可迭代对象，返回一个新的Array实例，在迭代中执行cb|
5|Array.isArray(array)|确定传递的值是否是一个数组|     
2015|Array.of(...elementN)|由可变数量的变量，返回一个新的Array实例

<!-- @include: ./tip.md -->

<!-- ::: details exercises
::: code-group
<<< @/../codes/js/std/Array/other.test.js [other]
::: -->
