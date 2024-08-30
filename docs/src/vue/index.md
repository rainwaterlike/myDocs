## 使用扩展运算符... 编译报错

因为babel配置不支持该语法。

在项目根目录下创建一个名为.babelre的文件，并在其中添加以下内容:

```js
{
  "presets": [
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

这里的 `defineProps` 可以是任意名称， `defineEmits` 必须为固定名称 `update:modelValue` ，不然数据会回传不到父组件

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

指定在 `<script setup>` 组件中要暴露出去的属性

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
import {
  themes
} from "./model";
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
const {
  generateTheme
} = require("antd-theme-generator");
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

## Ant Design Vue

### select下拉框使用dropdownRender自定义下拉框内容

需要加上 `@mousedown="e => e.preventDefault()"` 来防止点击按钮关闭 `select` 的情况

```vue
<template>
  <a-select
      v-model:value="jyr"
      :options="personOptions"
      mode="multiple"
      placeholder="请选择检验人"
      show-search
      style="flex: 1">
    <template #dropdownRender="{ menuNode }">
      <v-nodes :vnodes="menuNode"/>
      <a-divider style="margin: 4px 0"/>
      <a-space @mousedown="e => e.preventDefault()" style="margin-left: 5px">
        <a-button type="primary" :size="'small'" @click="selectAllJyr">全选</a-button>
        <a-button type="primary" :size="'small'" @click="clearSelectJyr">取消全选</a-button>
      </a-space>
    </template>
  </a-select>
</template>

<script setup>
import {defineComponent} from "vue";
const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true,
    },
  },
  render() {
    return this.vnodes;
  },
});
</script>
```

### 样式穿透

```css
.box :deep(.ant-slider-disabled .ant-slider-track) {
  background-color: yellow !important;
}
```

## 点击左右按钮切换列表的当前项目

```vue
<template>
  <div class="container">
    <div class="list" ref="list">
      <div class="item" v-for="item in items" :key="item">
        {{ item }}
      </div>
    </div>
    <button class="left-btn" :disabled="isLeftDisabled" @click="scrollLeft">
      左
    </button>
    <button class="right-btn" :disabled="isRightDisabled" @click="scrollRight">
      右
    </button>
  </div>
</template>

<script setup>
// 左右按钮移动列表
const listRef = ref(null)
const list = ref(caseNumInfo)

const itemWidth = 200

// 监听列表项变化
watch(list, () => {
  scrollToIndex(0)
})

// 滚动到指定索引位置
const scrollToIndex = (index) => {
  const listContainer = listRef.value
  if (listContainer) {
    listContainer.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    })
  }
}

// 点击左按钮
const scrollLeft = () => {
  const currentIndex = Math.floor(listRef.value.scrollLeft / itemWidth)
  if (currentIndex > 0 && listRef.value.scrollLeft > 0) {
    scrollToIndex(currentIndex - 1)
  }
  updateButtonStatus('左')
}

// 点击右按钮
const scrollRight = () => {
  const currentIndex = Math.floor(listRef.value.scrollLeft / itemWidth)
  const isRightDisabled = listRef.value.offsetWidth + listRef.value.scrollLeft >= listRef.value.scrollWidth
  if (currentIndex < list.value.length - 1&&!isRightDisabled) {
    scrollToIndex(currentIndex + 1)
  }
  updateButtonStatus('右')
}
const isLeftDisabled = ref(false)
const isRightDisabled = ref(false)
const updateButtonStatus = (type)=>{
  if (type === '左'){
    isRightDisabled.value = false
    isLeftDisabled.value = listRef.value.scrollLeft === 0
  }else {
    isLeftDisabled.value = false
    isRightDisabled.value = listRef.value.offsetWidth + listRef.value.scrollLeft >= listRef.value.scrollWidth
  }
}
onMounted(() => {
  //将列表滚动至起始位置
  scrollToIndex(0)
  updateButtonStatus()
})
</script>
```

## 列表单选

```vue
<template>
  <div>
    <div
      class="header_bookList_item"
      v-for="(item,index) in caseNumInfo"
      :key="index"
      :class="{ selected: selectedIndex === index }"
      @click="selectItem(index)"
    >
      <!--  序号 -->
      <div class="header_bookList_item_bookNo">{{ index + 1 }}</div>
      <!--  文书编号 -->
      <div class="header_bookList_item_number">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const caseNumInfo = ref([
  'J520100-40-220039',
  'J520100-40-220040',
  'J520100-40-220041',
  'J520100-40-220042',
  'J520100-40-220043'
]);

const selectedIndex = ref(null);

const selectItem = (index) => {
  selectedIndex.value = index;
};
</script>

<style lang="less" scoped>
.selected {
  background-color: #f2f2f2;
}
&:hover &_bookNo,.caseSelected &_bookNo{
  border: 1px solid #1890FF;
  cursor: pointer
}
</style>
```

## 列表多选、全选

```vue
<template>
  <div v-show="infoType === '2'" class="evidInfo">
    <div class="item" v-for="(item) in evidenceInfo" :key="item.jcbh"
         :class="{ 'selected-item': selectedKeys.includes(item.jcbh) }" @click="toggleSelection(item.jcbh)">
      <!--选择框-->
      <input type="checkbox" :checked="selectedKeys.includes(item.jcbh)">
      <!--物证图片-->
      <div class="image">
        <a-image
            :width="80"
            :src="item.imgUrl"
        />
      </div>
      <!--物证内容-->
      <div class="info">
        <div class="flexrow">
          <div><span>{{ item.wzlx }}</span><span>{{ item.wzmc }}</span></div>
          <div class="detail" @click.stop="evidenceDetail">查看详情 ></div>
        </div>
        <div><span class="evidlistTitle">检材编号：</span>{{ item.jcbh }}</div>
        <div class="flexrow">
          <span><span class="evidlistTitle">提取方法：</span><span class="listValue">{{
              item.tqff
            }}</span></span>
          <span><span class="evidlistTitle">提取人：</span><span class="listValue">{{ item.tqr }}</span></span>
        </div>
        <div>
          <span class="evidlistTitle">物证描述：</span>
          <span class="listValue">{{ item.wzms }}</span>
        </div>
      </div>
    </div>
    <!--按钮-->
    <a-space>
      <a-button type="primary" :size="'small'" @click="selectAll">全选</a-button>
      <a-button type="primary" :size="'small'" @click="clearSelection">取消全选</a-button>
    </a-space>
    <!--检验人-->
  </div>
</template>

<script setup>
const evidenceInfo = [
  {
      imgUrl: 'https://axure-file.lanhuapp.com/md5__b61b7012b01b6f96deaf382aeb9cf25f.png',
      wzlx: '手机检验',
      wzmc: '手机',
      jcbh: 'J330600-40-220001-002',
      tqff: '原物提取',
      tqr: '李华 (135 9879 6786)',
      wzms: '标记为“iphone6s”手机一台'
  },
  {
      imgUrl: 'https://axure-file.lanhuapp.com/md5__b61b7012b01b6f96deaf382aeb9cf25f.png',
      wzlx: '手机检验',
      wzmc: '手机',
      jcbh: 'J330600-40-220001-003',
      tqff: '原物提取',
      tqr: '李华 (135 9879 6786)',
      wzms: 'iphone6s手机'
  }
]
// 勾选的列表id
const selectedKeys = ref([]);
// 全选：把所有id放到已勾选的数组内
const selectAll = () => {
  selectedKeys.value = evidenceInfo.map(item => item.jcbh)
};
//取消全选
const clearSelection = () => {
  selectedKeys.value = [];
};
// 列表点击时勾选上
const toggleSelection = (jcbh) => {
  const index = selectedKeys.value.findIndex(i => i === jcbh);
  if (index > -1) {
    selectedKeys.value.splice(index, 1);
  } else {
    selectedKeys.value.push(jcbh);
  }
};
</script>
```

## 缓存iframe 页面

<https://juejin.cn/post/6844903894783361032>

## 子组件监听props的变化

```js
const props = defineProps < {
  value: string
} > ()

const relationship = ref(props.value)
```

`props.value` 并不是响应式的数据。当父组件中的 `relationship` 发生变化时， `props.value` 并不会自动更新
因此 `watch` 监听不到变化。

要使子组件能够监听到 `props.value` 的变化，可以使用 `toRef()` 函数将 `props.value` 转换为响应式数据。修改子组件代码如下：
 `const relationship = toRef(props, 'value')`
