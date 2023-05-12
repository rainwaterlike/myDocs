## 使用扩展运算符...编译报错
因为babel配置不支持该语法。

在项目根目录下创建一个名为.babelre的文件，并在其中添加以下内容:
```js
{
    "presets":[
        "@babel/preset-env",
        "@vue/cli-plugin-babel/preset"
    ],
    "plugins": ["@babel/plugin-proposal-object-rest-spread"]
}
```
这将使用 '@babel/plugin-proposal-object-rest-spread' 插件来支持扩展运算符。请确保您已经安装了该插件，您可以通过以下命令进行安装:

```shell
npm install--save-dev @babel/plugin-proposal-object-rest-spreadnpm
```
安装后重新运行工程

如果是第三方库的props不支持扩展运算符，可以尝试以下写法
```vue
<template>
  <my-component v-bind="propsObject"></my-component>
</template>

<script>
export default {
  data() {
    return {
      propsObject: {
        prop1: 'value1',
        prop2: 'value2',
        // ...
      }
    }
  }
}
</script>
```