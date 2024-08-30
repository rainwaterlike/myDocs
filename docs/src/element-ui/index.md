## el-tree setCheckedKeys无效
因为id有重复的，手动设置一个不重复的id给node-key就可以了

## element 表格错位
参考资料：https://www.jb51.net/article/256462.htm

例如 使用了`keep-alive`切换页面后表格错位了，需要使用`doLayout`方法重新布局一下

```js
activated(){
    this.$refs.tableRef?.doLayout();
 },
```

## element form对upload组件进行校验
``` js
uploadRules: {
   file: [{ required: true, validator: this.validateFiles, message: "请上传附件", trigger: "change" }]
},
validateFiles(rule, value, callback) {
    let files = this.$refs["file"].uploadFiles;
    if (!files.length) {
        callback(new Error("请选择要上传的文件！"));
    }
    callback();
}
```

## 父容器是flex布局，导致element table没有自适应宽度
element table的父容器设置 `display:grid`把flex顶掉就行
