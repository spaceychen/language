# 模块

## 模块的声明和加载

以下行为被识别为模块：

- `.html`文件中写`<script type="module">`标签
- `.js`文件中写`export`语句
- `.js`文件被导入（不论该文件中有无 export 关键字），js 引擎会创建导出名字表(非模块的导出名字为空)

加载模块的方式

```javascript
// 简单装载： 1，顶层代码会被按顺序执行一次。2，首次加载即缓存，因此常用来做预加载模块
import "module-name";

// (模块或接口)命名导入
import another-name from "module-name";
import defaultExportName as another-name from "module-name";
import { x,y as z } from "module-name";
import another-name,{x,y} from "module-name";

// 名字空间导入
import * as name-space from "module-name";

// 混用: 导入模块的默认导出，导入模块的具名导出为命名空间对象
import defaultExport, * as name-space from "module-name";
```

声明模块的方法

```javascript
// 导出未声明
export let key1,key2=...,...,keyn;
export function fn(){}

// 导出已声明
export {key1,key2,...,keyn as default};

// 导出默认接口
export default let key1;
export default function fn(){}

// 聚合导出
export default,* as name-space from "module-name";
```

## 名字空间的特殊性

TODO
