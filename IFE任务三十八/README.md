#表格组件API
1.在HTML的<head>的标签下加入组件的css与js 例：

```HTML
<link rel="stylesheet" href="tableTool.css">
<script src="task.js"></script>  //HTML
```
在HTML中加入带有id的DIV 例：
```HTML
<div id = "#createTable1"></div>  //HTML
```
2.在js中调用组件先调用表头
表头组件参数为：定义表头,参数为 array 内部 object 的参数为{label:表头显示名, name:表头实际含义 sort:是否需要排序(boolean)}
表格参数需要与之前的表头参数一一对应
```javascript
<javascript>
var tableTitle = [{label: "姓名", name: "name", sort: "false"},{label: "语文", name: "chinese", sort: true} ......] 
var tableData = {xiaoming: {name: "明明", chinese: 80, math: 90, english: 70, sum: 240}, ......} //javascript
</javascript>
````
3.传入参数，调用组件
```javascript
<javascript>
createTable('#createTable2', tableTitle, tableData);
</javascript>

