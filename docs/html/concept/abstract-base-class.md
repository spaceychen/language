# 抽象基类
我们知道一般的类都是可以用来：
- 实例化
- 类型检测
- 原型链扩展
- 自定义元素扩展

实例化
```js
// 浏览器中无法实例化抽象基类
new HTMLElement();  // 报错：new 的对象不能是抽象基类
new Array(); // []
```
问题：那 js 的设计为什么会这样呢，将抽象基类隐藏起来不好吗？
答案不言自明，因为抽象基类也是类啊，除了不能被实例化，还有其他需要。

1.类型检测
```js
const div = document.createElement('div');
console.log(div instanceof HTMLElement); // true
```

2.原型链扩展
```js
// 为所有 HTML 元素添加扩展方法
HTMLElement.prototype.fadeOut = function() {
  this.style.transition = 'opacity 0.5s';
  this.style.opacity = '0';
};

document.querySelector('div').fadeOut(); // 所有元素均可调用
```

3.自定义元素扩展
```js
class MyButton extends HTMLElement {
  constructor() {
    super();
    // ...
  }
}
customElements.define('my-button', MyButton);
```


## 抽象基类有哪些？

- EventTarget
- Node
- Element
- HTML*Element
- SVGElement
- Document
- CharacterData
- Attr
- ...

抽象基类验证函数
```js
// 抽象基类验证函数
function isAbstractClass(constructor) {
  try {
    new constructor()
    return false // 可实例化,非抽象基类
  } catch (e) {
    return e instanceof TypeError;

const propNames = Object.getOwnPropertyNames(window);
let abstractClasses = [];
for(propName key of propNames){
    if(isAbstractClass(window[propName])) abstractClasses.push(propName);
}
```


