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

## 父子组件v-model通讯
父组件
```vue
<template>
  <MyInput v-model="inputVal"></MyInput>
</template>

<script lang="ts" setup>
  import MyInput from './MyInput.vue';
</script>
```
子组件

这里的`defineProps`可以是任意名称，`defineEmits`必须为固定名称 `update:modelValue`，不然数据会回传不到父组件
```vue
<template>
    {{ `子组件：${value}` }}
    <input type="text" v-model="value" @input="change">
</template>

<script lang="ts" setup>
import { ref } from "vue";
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const value = ref(props.modelValue)

const change = (e: Event) => {
    emit('update:modelValue', `${(e.target as HTMLInputElement).value}`)
}
</script>

```

## defineExpose
指定在`<script setup>`组件中要暴露出去的属性

子组件：
```vue
<template>
  <a-drawer
      v-model:visible="visible"
      title="项目配置"
      placement="right"
      width="300px"
  >
  </a-drawer>
</template>

<script setup>
import {ref} from "vue";

const visible = ref(false)
const open = () => {
  visible.value = true
}
//暴露open方法
defineExpose({open})
</script>
```

父组件：
```vue
<template>
  <button @click="SettingDrawerRef?.open()"></button>
  <SettingDrawer ref="SettingDrawerRef"></SettingDrawer>
</template>

<script setup>
import {ref} from "vue";
const SettingDrawerRef = ref()
</script>
```

## 动态换肤
### 安装必要插件
在这里我们会用到两个样式处理插件，项目执行以下命令：
```sh
npm install style-resources-loader -D
npm install vue-cli-plugin-style-resources-loader -D
```

为了让我们的Vue项目里面能够使用less，还需要安装less相关插件：
```sh
npm install less-loader@5.0.0 --save
npm install less --save
```
Vue项目如何配置less这里不做过多的介绍，因为我们的重点不在这里，我们的最终目的就是在项目里面能够使用less。

### 新建style.less
style.less用于配置全局的默认样式，也可以是默认主题或字体颜色。在项目src目录下新建theme文件夹，然后新建style.less，代码如下：
```less
/src/theme/style.less

// 默认的主题颜色
@primaryColor: var(--primaryColor, #000);
@primaryTextColor: var(--primaryTextColor, green);
// 导出变量
:export {
  name: "less";
  primaryColor: @primaryColor;
  primaryTextColor: @primaryTextColor;
}
```

### 配置vue.config.js
在项目根目录新建vue.config.js文件，编写配置，代码如下：
```js
const path = require("path");
module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 这个是加上自己的路径,不能使用(如下:alias)中配置的别名路径
        path.resolve(__dirname, "./src/theme/style.less"),
      ],
    },
  },
};
```

当我们配置好vue.config.js文件后，就可以在项目的任何地方使用我们预先定义的less变量了，示例代码如下：
```vue
<style lang="less" scoped>
p {
    color: @primaryTextColor;
}
</style>
```

我们随意更改一下我们的Vue项目：
修改HelloWorld组件，在组件中使用less语法以及刚刚我们定义的全局变量。
组件代码如下：
```vue
<template>
  <div class="hello">
    <p>我是测试文字</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
};
</script>
<style scoped lang="less">
.hello {
  p {
    color: @primaryTextColor;
  }
}
</style>
```
此时的文字颜色便是我们刚刚设置的绿色了。

### 编写修改主题的方法
全局的颜色变量以及两套默认主题我们都编写好了，在这里我们已经实现了静态更改主题，即可以更改颜色，项目重新运行后便可生效。但是这还达不到我们的目的，我们需要动态更改主题，所以我们还需要编写一个能够动态更改主题的方法。
在/src/theme文件夹下新建theme.js文件，代码如下：
```js
import { themes } from "./model";
// 修改页面中的样式变量值
const changeStyle = (obj) => {
  for (let key in obj) {
    document
      .getElementsByTagName("body")[0]
      .style.setProperty(`--${key}`, obj[key]);
  }
};
// 改变主题的方法
export const setTheme = (themeConfig) => {
    localStorage.setItem("theme", themeConfig); // 保存主题到本地，下次进入使用该主题
    //localStorage.getItem("primaryColor")
    // let themeConfigObj = {
    //     primaryColor: themeConfig.primaryColor,
    //     primaryTextColor: localStorage.getItem("primaryTextColor"),
    // };
    changeStyle(themeConfig);
};
```

这里我们编写了两个方法，一个是更改全局css变量值的方法，达到更改样式的作用，另一个是更改主题的方法，可以让用户选择我们准备的几套主题或者自定义颜色。

## antdvue 动态换肤

### 安装依赖（注意版本号）

```js
"devDependencies": {
    "less": "^2.7.2",
    "less-loader": "^5.0.0",
    "antd-theme-generator": "^1.2.5"
  },
```
### 项目根目录创建theme.js文件
```js
const path = require("path");
const { generateTheme } = require("antd-theme-generator");
const options = {
  antDir: path.join(__dirname, "./node_modules/ant-design-vue"), // antdv对应具体位置
  stylesDir: path.join(__dirname, "./src/assets/styles/theme"), // less文件夹对应具体位置
  varFile: path.join(__dirname, "./src/assets/styles/theme/variables.less"), // 文件夹变量对应具体位置
  mainLessFile: path.join(__dirname, "./src/assets/styles/theme/index.less"),
  themeVariables: [ // 指定所有我们自定义需要切换的样式变量
    "@primary-color",
    "@link-color",
    "@border-color-base",
  ],
  indexFileName: "./public/index.html",
  outputFilePath: path.join(__dirname, "./public/theme.less"), // 打包出来的文件
};
generateTheme(options)
  .then((less) => {
    console.log("Theme generated successfully");
  })
  .catch((error) => {
    console.log("Error", error);
  });
```

### 修改vue.config.js

```js
require("./theme.js");
module.exports = {
    css: {
            loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {},
                    javascriptEnabled: true,
                },
            },
        },
    },
}
```

### 创建自定义主题文件src/assets/style/variables.less

```less
@import "~ant-design-vue/lib/style/themes/default.less";
@primary-color: #1890ff; // 全局主色
@link-color: #1890ff; // 链接色
@border-color-base: #d9d9d9; // 边框色

:root {
  --primary-color: @primary-color;
  --link-color: @link-color;
  --border-color-base: @border-color-base;
}
```

### 修改public/index.html文件

```html
<!DOCTYPE html>
<html lang="">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <link rel="icon" href="<%= BASE_URL %>favicon.ico">
  <title>
    <%= htmlWebpackPlugin.options.title %>
  </title>
</head>

<body>
  <noscript>
    <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled.
        Please enable it to continue.</strong>
  </noscript>
  <div id="app"></div>
  <!-- built files will be auto injected -->
  <link rel="stylesheet/less" type="text/css" href="./theme.less" />
  <script>
    window.less = {
      async: false,
      env: 'production'
    };
  </script>
  <!--    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/less.js/2.7.2/less.min.js"></script>-->
  <script type="text/javascript" src="./less.min.js"></script>
</body>
</html>
```
### 动态自定义颜色
```js
window.less.modifyVars({
    "@primary-color": '#f5222d',
})
```

## 着色器vue-color-kit
[官网](https://github.com/anish2690/vue-color-kit)
```sh
yarn add vue-color-kit
```

使用
```vue
<template>
    <ColorPicker
        theme="light"
        :sucker-hide="true"
        :color="themeColor.primaryColor"
        :colors-default="defaultColorList"
        @changeColor="changeColor"
    ></ColorPicker>
  </a-drawer>
</template>

<script setup>
import {ref, watch} from "vue";
import {ColorPicker} from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'
import {useLocalStorage} from '@vueuse/core'
//着色器的颜色
const themeColor = useLocalStorage('themeColor', {})
const changeColor = (colorObj) => {
  themeColor.value = {primaryColor: colorObj.hex}
}

// 默认显示的主题色列表
const defaultColorList = [
  '#165DFF',
  '#409EFF',
  '#2d8cf0',
  '#007AFF',
  '#5ac8fa',
  '#5856D6',
  '#536dfe',
  '#9c27b0',
  '#AF52DE',
  '#0096c7',
  '#00C1D4',
  '#34C759',
  '#43a047',
  '#7cb342',
  '#c0ca33',
  '#78DEC7',
  '#e53935',
  '#d81b60',
  '#f4511e',
  '#fb8c00',
  '#ffb300',
  '#fdd835',
  '#6d4c41',
  '#546e7a'
]
</script>

<style scoped>
/*处理着色器内容溢出的bug*/
.hu-color-picker {
  box-sizing: content-box;
  margin: auto;
}
</style>
```
