# 工具

找出所有 HTML*Element抽象基类
```js
function findHTMLClasses() {
    const propNames = Object.getOwnPropertyNames(window);
    return propNames.filter(propName => propName.startsWith('HTML'));
}
console.log(findHTMLClasses());
```

找出类的继承关系

```js
function generatePrototypeOf(tagName) {
    const element = document.createElement(tagName);
    const protoChain =[element];

    while (true) {
        const  proto = Object.getPrototypeOf(protoChain[protoChain.length-1]);
        if (proto === null) break;
        protoChain.push(proto);
    }
    protoChain.shift();
    
    return protoChain.map(proto=>proto.constructor.name);
}

console.log(generatePrototypeOf('html'));
console.log(generatePrototypeOf('div'));
```