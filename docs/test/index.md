# Test Page

Project Directory：
```dir
codes    # demo sourcecode files
|___js
    |___test2.js
docs    # document files
|___test
    |___index.md
    |___test.js
```

Test Design：Embedding 'js' files in 'docs/test/index. md' does not display it's source code.

Question：How can the original content of an external file be displayed in a markdown file?

## Case1：`docs/test/test.js` did not display

ps: js file in docs directory!!


absolute path
```js file="/test/test.js"
```
relative path
```js file="./test.js"
```

##  Case2：`codes/js/test2.js` did not display

ps: js file not in docs directory!!


absolute path
```js file="/../codes/js/test2.js"
```
relative path
```js file="../../../codes/js/test2.js"
```
alias path
```js file="@js/test2.js"
``` 